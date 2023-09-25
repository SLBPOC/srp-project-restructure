import { WellModel } from "../models/wellModel";

export enum NodeType {
    Field,
    Battery,
    Pad,
    Wells
  }
  
  export interface Node {
    type: NodeType;
    Name: string;
    // Children?: Node[];
    isOn?: boolean;
    // NodeId: number;
    // NodeParentId?: number;
    nodeId: number;
    children: Node[];
    nodeParentId?: number;

  }
  
  export class FlatNode {
    // Type!: NodeType;
    Name!: string;
    isOn?: boolean;
    Id!: string;
    level!: number;
    expandable!: boolean;
    type!: NodeType
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