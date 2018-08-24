export class RowData {

    tenantName: string;
    purchaseOrderNumber: string;
    reasonOfFailure: string;
    modifiedOn: string;
    tenantId: string;
    entityId: string;

    constructor(
            tenantName: string,
            purchaseOrderNumber: string,
            reasonOfFailure: string,
            modifiedOn: string,
            tenantId: string,
            entityId: string
        ) {
        this.tenantName = tenantName;
        this.purchaseOrderNumber = purchaseOrderNumber;
        this.reasonOfFailure = reasonOfFailure;
        this.modifiedOn = modifiedOn;
        this.tenantId = tenantId;
        this.entityId = entityId;
    }
}
