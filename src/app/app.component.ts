import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { StepperComponent } from '@progress/kendo-angular-layout';

@Component({
    selector: 'my-app',
    template: `
        <div class="example">
            <kendo-stepper #stepper [steps]="steps" stepType="full" [(currentStep)]="currentStep" [style.width.px]="550"> </kendo-stepper>

            <form class="k-form" [formGroup]="form">
                <account-details *ngIf="currentStep === 0" [accountDetails]="currentGroup"> </account-details>
                <personal-details *ngIf="currentStep === 1" [personalDetails]="currentGroup"> </personal-details>
                <payment-details *ngIf="currentStep === 2" [paymentDetails]="currentGroup"> </payment-details>
                <span class="k-form-separator"></span>
                <div class="k-form-buttons k-buttons-end">
                    <span class="page">Step {{ currentStep + 1 }} of 3</span>
                    <div>
                        <button class="k-button prev" *ngIf="currentStep !== 0" (click)="prev()">Previous</button>
                        <button class="k-button k-primary" (click)="next()" *ngIf="currentStep !== 2">Next</button>
                        <button class="k-button k-primary" (click)="submit()" *ngIf="currentStep === 2">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.styles.css']
})
export class AppComponent {
    @ViewChild('stepper', { static: true })
    public stepper: StepperComponent;

    public currentStep = 0;

    private sumbitted = false;

    private isStepValid = (index: number): boolean => {
        return this.getGroupAt(index).valid;
    };

    private shouldValidate = (): boolean => {
        return this.sumbitted === true;
    };

    public steps = [
        {
            label: 'Account Details',
            isValid: this.isStepValid,
            validate: this.shouldValidate
        },
        {
            label: 'Personal Details',
            isValid: this.isStepValid,
            validate: this.shouldValidate
        },
        {
            label: 'Payment Details',
            isValid: this.isStepValid,
            validate: this.shouldValidate
        }
    ];

    public form = new FormGroup({
        accountDetails: new FormGroup({
            userName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            avatar: new FormControl(null)
        }),
        personalDetails: new FormGroup({
            fullName: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            gender: new FormControl(null, [Validators.required]),
            about: new FormControl('')
        }),
        paymentDetails: new FormGroup({
            paymentType: new FormControl(null, Validators.required),
            cardNumber: new FormControl('', Validators.required),
            cvc: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
            expirationDate: new FormControl('', Validators.required),
            cardHolder: new FormControl('', Validators.required)
        })
    });

    public get currentGroup(): FormGroup {
        return this.getGroupAt(this.currentStep);
    }

    public next(): void {
        this.currentStep += 1;
    }

    public prev(): void {
        this.currentStep -= 1;
    }

    public submit(): void {
        this.sumbitted = true;

        if (!this.form.valid) {
            this.form.markAllAsTouched();
            this.stepper.validateSteps();
        }

        console.log('Submitted data', this.form.value);
    }

    private getGroupAt(index: number): FormGroup {
        const groups = Object.keys(this.form.controls).map((groupName) => this.form.get(groupName)) as FormGroup[];

        return groups[index];
    }
}
