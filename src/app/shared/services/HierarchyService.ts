import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Node, NodeType } from './models';
import { WellsService } from './wells.service';



@Injectable()
export class HierarchyService {

  dataChange = new BehaviorSubject<Node[]>([]);

  flatnedTree_data: Node[] = [];

  TREE_DATA: Node[] = [];

  get data(): Node[] { return this.dataChange.value; }

  constructor(private service: WellsService) {
    this.initialize();
  }

  initialize() {
    this.service.getWellHierarchy().subscribe((x: any) => {
      this.TREE_DATA = x.hierarchy;
      this.flatnedTree_data = this.flattened(this.TREE_DATA, this.flatnedTree_data);
      this.reset();
    });
  }

  searchData(searchText: string, nodetypes: NodeType[]) {
    this.service.searchWellHierarch(searchText, nodetypes).subscribe((x: any) => {
      this.TREE_DATA = x.hierarchy;
      this.flatnedTree_data = this.flattened(this.TREE_DATA, this.flatnedTree_data);
      this.reset();
    });
  }

  reset() {
    this.dataChange.next(this.TREE_DATA);
  }

  flattened(nodes: Node[], finalArray: Node[]) {
    finalArray = finalArray || [];
    nodes.forEach((x: Node) => {
      finalArray.push(x);
      if (x.Children != null && x.Children.length > 0)
        this.flattened(x.Children, finalArray);
    });
    return finalArray;
  }

}
