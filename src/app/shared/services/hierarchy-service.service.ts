import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Node, NodeType } from '../models/models';
import { WellsService } from '../services/wells.service';

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
    this.service.getWellHierarchy().subscribe(x => {
      this.TREE_DATA = x.hierarchy;
      this.flatnedTree_data = this.flattened(this.TREE_DATA, this.flatnedTree_data);
      this.reset();
    });
  }

  searchData(searchText: string, nodetypes: NodeType[]) {
    this.service.searchWellHierarch(searchText, nodetypes).subscribe(x => {
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
    nodes.forEach((x: any) => {
      finalArray.push(x);
      if (x.children != null && x.children.length > 0)
        this.flattened(x.children, finalArray);
    });
    return finalArray;
  }

}
