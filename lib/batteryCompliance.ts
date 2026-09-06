import published from '@/content/compliance/batteries.json';
export interface PublishedBattery {
 slug:string; model:string; capacityMah:number; nominalVoltage:number; chemistry:string; version:string;
 image:string; summary:string;
 documents:Array<{number:string;documentType:string;laboratory:string;issueDate:string;standards:string[];scope:string;recordedResult:string}>;
}
// Only source-reviewed, explicitly approved public records belong in this file.
// The internal matrix is deliberately never imported here.
export const publishedBatteries = published as PublishedBattery[];
