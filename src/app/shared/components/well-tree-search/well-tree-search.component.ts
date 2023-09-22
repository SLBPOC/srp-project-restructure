import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { TreeViewService } from '../../../shared/services/tree-view.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { SavedState, Node, NodeType } from '../../../shared/services/models';
// import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-well-tree-search',
  templateUrl: './well-tree-search.component.html',
  styleUrls: ['./well-tree-search.component.css'],
})
export class WellTreeSearchComponent {
  option: string = "fields"
  searchText!: string;
  isSaveEnabled: boolean = false;
  hasSavedList: boolean = false;
  savedStateName: string = '';
  currentSelectedSavedSearch!: SavedState | null;
  selectedNodes!: Node[];
  selectedNodeTypes: NodeType[] = [];
  fieldCheckbox: boolean = true;
  batteryCheckbox: boolean = false;
  padCheckbox: boolean = false;
  wellCheckbox: boolean = false;

  @Output()
  userChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(public treeViewService: TreeViewService, public dialog: MatDialog) {
    this.treeViewService.selectedNodes.subscribe(x => {
      this.isSaveEnabled = x != null && x != undefined && x.length != 0 && this.currentSelectedSavedSearch == null;
    })
    this.treeViewService.savedStateEmit.subscribe(x => this.hasSavedList = x.length > 0);
    this.treeViewService.selectedSavedTreeStateEvent.subscribe(x => {
      this.currentSelectedSavedSearch = x.state;
      if (x.fresh) {
        this.option = <string>x.state?.SavedOption || 'fields';
        this.searchText = <string>x.state?.SavedText || '';
        this.onSearchChange()
      }
      else if (x.state == null) {
        this.option = 'fields';
        this.searchText = '';
        this.onSearchChange()
      }
    });
    this.treeViewService.selectedNodes.subscribe(x => {
      this.selectedNodes = x;
    });
    this.selectedNodeTypes.push(NodeType.Field);
  }

  onCheckBoxChange(event: any, nodeType: NodeType) {
    if (event.checked)
      this.selectedNodeTypes.push(nodeType);
    else
      this.selectedNodeTypes.splice(this.selectedNodeTypes.findIndex(x => x == nodeType), 1);
    this.onSearchChange();
  }
  onSearchChange() {
    this.userChanged.emit({ option: this.selectedNodeTypes, searchText: this.searchText });
  }
  onClear() {
    this.treeViewService.setSelectedSavedTreeState(null);
    this.fieldCheckbox = true;
    this.batteryCheckbox = false;
    this.padCheckbox = false;
    this.wellCheckbox = false;
    this.selectedNodeTypes = [];
    this.selectedNodeTypes.push(NodeType.Field);
    this.userChanged.emit({ clear: true });
  }
  public save() {
    // console.log(this.selectedNodes);
    this.treeViewService.SaveState({
      Name: this.savedStateName,
      SavedOption: this.option,
      SavedText: this.searchText,
      SelectedNode: this.selectedNodes
    });
    this.isSaveEnabled = false;
  }
  openSaveDialog(): void {
    const dialogRef = this.dialog.open(SaveTreeStateDialog, {
      width: '250px',
      data: this.savedStateName
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null && result.trim() != '') {
        this.savedStateName = result;
        this.save();
        this.savedStateName = "";
        this.isSaveEnabled = false;
      }
    });
  }
  onSelect(event: MatSelectChange) {
    console.log(event);
    this.treeViewService.setSelectedSavedTreeState(event.value, true)
  }
}


@Component({
  selector: 'save-tree-state-dialog',
  template: `
  <!-- <div mat-dialog-content>
    <mat-form-field>
      <input placeholder="Enter a name" matInput [(ngModel)]="data">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Save</button>
  </div> -->
  `,
})
export class SaveTreeStateDialog {

  constructor(
    public dialogRef: MatDialogRef<SaveTreeStateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}