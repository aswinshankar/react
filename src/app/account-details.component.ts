import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FileRestrictions } from '@progress/kendo-angular-upload';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
@Component({
    selector: 'account-details',
    template: `
        <ng-container [formGroup]="accountDetails">
            <kendo-formfield>
                <kendo-label [for]="username" text="Username"></kendo-label>
                <kendo-textbox formControlName="userName" #username [clearButton]="true"></kendo-textbox>
                <kendo-formerror>Username is required</kendo-formerror>
            </kendo-formfield>

            <kendo-formfield>
                <kendo-label [for]="email" text="Email"></kendo-label>
                <kendo-textbox formControlName="email" #email [clearButton]="true"></kendo-textbox>
                <kendo-formerror *ngIf="accountDetails.controls.email.errors?.required">Email is required</kendo-formerror>
                <kendo-formerror *ngIf="accountDetails.controls.email.errors?.email">Not a valid email format</kendo-formerror>
            </kendo-formfield>

            <kendo-formfield>
                <kendo-label [for]="password" text="Password"> </kendo-label>
                <kendo-textbox formControlName="password" #password required [clearButton]="true">
                    <ng-template kendoTextBoxSuffixTemplate>
                        <button kendoButton look="clear" icon="eye" (click)="toggleVisibility()"></button>
                    </ng-template>
                </kendo-textbox>

                <kendo-formerror>Password is required</kendo-formerror>
            </kendo-formfield>

            <kendo-formfield>
                <kendo-label [for]="avatar" [optional]="true" text="Avatar"></kendo-label>
                <kendo-upload
                    #avatar
                    formControlName="avatar"
                    [saveUrl]="uploadSaveUrl"
                    [removeUrl]="uploadRemoveUrl"
                    [restrictions]="restrictions"
                >
                </kendo-upload>

                <kendo-formhint>Allowed extensions are jpg, jpeg or png</kendo-formhint>
            </kendo-formfield>
        </ng-container>
    `
})
export class AccountDetailsComponent implements AfterViewInit {
    public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
    public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

    public restrictions: FileRestrictions = {
        allowedExtensions: ['jpg', 'jpeg', 'png']
    };

    @Input() public accountDetails: FormGroup;
    @ViewChild('password') public textbox: TextBoxComponent;

    public ngAfterViewInit(): void {
        this.textbox.input.nativeElement.type = 'password';
    }

    public toggleVisibility(): void {
        const inputEl = this.textbox.input.nativeElement;
        inputEl.type = inputEl.type === "password" ? "text" : "password";
    }
}
