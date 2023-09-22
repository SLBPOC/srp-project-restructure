import { WellModel } from './wellModel';

export enum NodeType {
    Field,
    Battery,
    Pad,
    Wells
  }
  
  export interface Node extends WellModel {
    Type: NodeType;
    Name: string;
    Children?: Node[];
    isOn?: boolean;
    NodeId: number;
    NodeParentId?: number;
  }
  
  export class FlatNode {
    Type!: NodeType;
    Name!: string;
    isOn?: boolean;
    Id!: string;
    level!: number;
    expandable!: boolean;
  }

  export class SavedState{
    Name!:string;
    SelectedNode!:Node[];
    SavedText!:string;
    SavedOption!:string;
  }

  export interface WellHierarchyResult {
    hierarchy: Node[]
  }