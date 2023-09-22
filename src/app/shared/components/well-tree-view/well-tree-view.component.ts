import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl, NestedTreeControlOptions } from '@angular/cdk/tree';
import { Component, Injectable, Input, OnChanges, SimpleChanges, Output, EventEmitter, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, tap } from 'rxjs';
import { TreeViewService } from '../../../shared/services/tree-view.service';
import { Node, NodeType, FlatNode } from '../../../shared/models/models'
import { WellsService } from '../../../shared/services/wells.service';
import { WellModel, WellModelResult } from '../../../shared/models/wellModel';
import { HierarchyService } from '../../services/hierarchy-service.service';

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
      node.forEach((x: any) => {
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

    hierarchyService.dataChange.subscribe((data: any) => {
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
    var list = this.hierarchyService.flatnedTree_data.filter((y: any) => this.checklistSelection.selected.some(z => z == y.nodeId));
    this.treeviewService.selectedNodes.next(list);
  }

  UpdateTreeSelection(nodes: Node[]) {
    var nodes1 = <Node[]>this.hierarchyService.flatnedTree_data.filter((x: any) => nodes.some((y: any) => y.nodeId == x.nodeId))
    nodes1.forEach((x: any) =>
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
    return (node.Type == NodeType.Field || node.Type == NodeType.Pad || node.Type == NodeType.Battery);
  }

  isCheckbox(node: FlatNode) {
    // console.log(node, node.type == NodeType.Pad || node.type == NodeType.Wells);
    return node.Type == NodeType.Pad || node.Type == NodeType.Wells;
  }

  @Input()
  searchObj: any;


  hasChild(_: number, node: Node) {
    return !(node.Children == null || node.Children == undefined ||
      (node.Children != null && node.Children.length == 0));
  };


  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child.NodeId)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child.NodeId));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node.NodeId);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node.NodeId)
      ? this.checklistSelection.select(...(descendants.map(x => x.NodeId)))
      : this.checklistSelection.deselect(...descendants.map(x => x.NodeId));

    // // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child.NodeId)
    );
    this.checkAllParentsSelection(node);
    this.updateSelectedCheckList();
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node.NodeId);
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
    const nodeSelected = this.checklistSelection.isSelected(node.NodeId);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child.NodeId)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node.NodeId);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node.NodeId);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: Node): Node | null {
    return <Node | null>this.hierarchyService.flatnedTree_data.find((x: any) => x.NodeId == node.NodeParentId);
  }
}