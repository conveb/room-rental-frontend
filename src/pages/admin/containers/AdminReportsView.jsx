import React, { useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAdminReports } from "../../../hooks/admin/useAdminReports";

export default function AdminReportsView() {
    const { reportedOwners, reportedProperties, loading, refresh } = useAdminReports();
    
    // Refs for CSV Export
    const dtOwners = useRef(null);
    const dtProps = useRef(null);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Export Functions
    const exportOwnersCSV = () => dtOwners.current.exportCSV();
    const exportPropsCSV = () => dtProps.current.exportCSV();

    return (
        <div className="space-y-8">
            {/* Header / Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-3 rounded-xl border shadow-sm space-y-4">
                    <div className="flex gap-5 justify-center items-center">
                        <div className="flex inset-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                            <i className="pi pi-file-excel text-xl"></i>
                        </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Quick Export</h3>
                        <p className="text-xs text-gray-500">Download current table views as spreadsheet files.</p>
                    </div>
                        {/* <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">CSV</span> */}
                    </div>
                    <div className="flex gap-2 text-xs md:text-sm">
                        <Button label="Owners CSV" icon="pi pi-download" onClick={exportOwnersCSV} className="p-button-outlined p-button-sm flex-1 border border-dashed p-2" />
                        <Button label="Properties CSV" icon="pi pi-download" onClick={exportPropsCSV} className="p-button-outlined p-button-sm flex-1 border border-dashed p-2" />
                    </div>
                </div>

                <div className="md:col-span-2 bg-slate-900 p-6 rounded-xl text-white flex justify-between items-center shadow-lg">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Live Reports Overview
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        </h2>
                        <p className="opacity-70 mt-1">Reviewing {reportedOwners.length + reportedProperties.length} total flags across the platform.</p>
                    </div>
                    <Button icon="pi pi-refresh" className="p-button-rounded p-button-text text-white hover:bg-white/10" onClick={refresh} loading={loading} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* --- TABLE 1: OWNERS --- */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">Flagged Landowners</h3>
                    </div>
                    <DataTable 
                        ref={dtOwners} 
                        value={reportedOwners} 
                        loading={loading} 
                        rows={5} 
                        paginator 
                        className="text-sm"
                        exportFilename="reported_owners_report"
                    >
                        <Column field="reported_user" header="User ID" body={(r) => r.reported_user.slice(0,8)} />
                        <Column field="reason" header="Reason" body={(r) => <span className="text-red-600 font-medium">{r.reason}</span>} />
                        <Column field="status" header="Status" body={(r) => (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                {r.status}
                            </span>
                        )} />
                        <Column header="Reported On" body={(r) => formatDate(r.created_at)} />
                        <Column header="Actions" body={() => (
                            <div className="flex gap-2">
                                <Button icon="pi pi-eye" className="p-button-text p-button-sm p-0" />
                                <Button icon="pi pi-ban" className="p-button-text p-button-danger p-button-sm p-0" />
                            </div>
                        )} />
                    </DataTable>
                </div>

                {/* --- TABLE 2: PROPERTIES --- */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">Flagged Properties</h3>
                    </div>
                    <DataTable 
                        ref={dtProps} 
                        value={reportedProperties} 
                        loading={loading} 
                        rows={5} 
                        paginator 
                        className="text-sm"
                        exportFilename="reported_properties_report"
                    >
                        <Column field="property" header="Property ID" body={(r) => r.property.slice(0,8)} />
                        <Column field="reason" header="Reason" className="italic" />
                        <Column field="status" header="Status" body={(r) => (
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                {r.status}
                            </span>
                        )} />
                        <Column header="Date" body={(r) => formatDate(r.created_at)} />
                        <Column header="Actions" body={() => (
                            <Button icon="pi pi-trash" className="p-button-text p-button-danger p-button-sm p-0" />
                        )} />
                    </DataTable>
                </div>

            </div>
        </div>
    );
}