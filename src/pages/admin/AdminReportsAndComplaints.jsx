import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { TabView, TabPanel } from "primereact/tabview";
import AdminComplaintsTable from "./containers/AdminComplaintsTable";
import AdminReportsView from "./containers/AdminReportsView";


export default function AdminReportsAndComplaints() {
const [activeIndex, setActiveIndex] = useState(0);
    return (
        <>
            <Helmet><title>Admin | Reports & Complaints</title></Helmet>
            
            <div className="p-2">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Management Center</h1>
                    <p className="text-gray-500 text-sm">Monitor platform health and user feedback.</p>
                </div>

                <TabView 
                    activeIndex={activeIndex} 
                    onTabChange={(e) => setActiveIndex(e.index)}
                    className="shadow-sm rounded-xl overflow-hidden"
                >
                    <TabPanel header="Complaints" leftIcon="pi pi-envelope mr-2">
                        <div className="pt-4">
                            <AdminComplaintsTable />
                        </div>
                    </TabPanel>
                    <TabPanel header="Reports" leftIcon="pi pi-chart-bar mr-2">
                        <div className="pt-4">
                            <AdminReportsView />
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </>
    );
}