import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl, NestedTreeControlOptions } from '@angular/cdk/tree';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { tap, zip } from 'rxjs';
import { TreeViewService } from '../../../shared/services/tree-view.service';
import { Node, NodeType, FlatNode } from '../../../shared/services/models'
import { WellsService } from '../../../shared/services/wells.service';
import { HierarchyService } from '../../services/HierarchyService';
// import { WellModel, WellModelResult } from '../../../shared/model/wellModel';


@Component({
  selector: 'app-well-tree-view',
  templateUrl: 'well-tree-view.component.html',
  styleUrls: ['well-tree-view.component.scss']
})
export class WellTreeView implements OnChanges, OnInit, AfterViewInit {

  @ViewChild('treeSelector') tree: any;

  treeControl: NestedTreeControl<Node>;

  dataSource: MatTreeNestedDataSource<Node>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<number>(true);

  expandTillPad(node: Node[]) {
    if (node.length > 0) {
      node.forEach(x => {
        if (x.type != NodeType.Pad)
          this.treeControl.expand(x);
        if (x.type != NodeType.Pad && x.children)
          this.expandTillPad(x.children);
      })
    }
  }
  GetChildren(x: any) {
    return x.children;
  }

  constructor(private hierarchyService: HierarchyService, public treeviewService: TreeViewService) {
    this.treeControl = new NestedTreeControl<Node>(x => this.GetChildren(x));
    this.dataSource = new MatTreeNestedDataSource();

    hierarchyService.dataChange.subscribe(data => {
      this.dataSource.data = data;
      this.treeControl.dataNodes = data;
      this.expandTillPad(this.treeControl.dataNodes);
    });

    this.treeviewService.selectedSavedTreeStateEvent.subscribe(x => {
      if (x.state != null && x.fresh) {
        this.checklistSelection.clear();
        // setTimeout(() => {
        this.UpdateTreeSelection(<Node[]>x?.state?.SelectedNode);
        // }, 500); 
        this.updateSelectedCheckList();
      }
      else if (x.state == null) {
        this.checklistSelection.clear();
        this.updateSelectedCheckList();
      }
    })
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {

  }

  updateSelectedCheckList() {
    var list = this.hierarchyService.flatnedTree_data.filter(y => this.checklistSelection.selected.some(z => z == y.nodeId));
    this.treeviewService.selectedNodes.next(list);
  }

  UpdateTreeSelection(nodes: Node[]) {
    var nodes1 = <Node[]>this.hierarchyService.flatnedTree_data.filter(x => nodes.some(y => y.nodeId == x.nodeId))
    nodes1.forEach(x =>
      this.checklistSelection.select(x.nodeId));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchObj != undefined && this.searchObj.searchText != undefined && this.searchObj.searchText.trim() != '')
      this.searchData();
    else {
      this.hierarchyService.initialize();
    }
  }

  searchData() {
    this.hierarchyService.searchData(this.searchObj.searchText, this.searchObj.option);
  }


  notWellNode(node: FlatNode) {
    return (node.type == NodeType.Field || node.type == NodeType.Pad || node.type == NodeType.Battery);
  }

  isCheckbox(node: FlatNode) {
    // console.log(node, node.type == NodeType.Pad || node.type == NodeType.Wells);
    return node.type == NodeType.Pad || node.type == NodeType.Wells;
  }

  @Input()
  searchObj: any;


  hasChild(_: number, node: Node) {
    return !(node.children == null || node.children == undefined ||
      (node.children != null && node.children.length == 0));
  };


  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child.nodeId)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child.nodeId));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node.nodeId);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node.nodeId)
      ? this.checklistSelection.select(...(descendants.map(x => x.nodeId)))
      : this.checklistSelection.deselect(...descendants.map(x => x.nodeId));

    // // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child.nodeId)
    );
    this.checkAllParentsSelection(node);
    this.updateSelectedCheckList();
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node.nodeId);
    this.checkAllParentsSelection(node);
    this.updateSelectedCheckList();
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: Node): void {
    let parent: Node | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: Node): void {
    const nodeSelected = this.checklistSelection.isSelected(node.nodeId);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child.nodeId)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node.nodeId);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node.nodeId);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: Node): Node | null {
    return <Node | null>this.hierarchyService.flatnedTree_data.find((x: Node) => x.nodeId == node.nodeParentId);
  }
}