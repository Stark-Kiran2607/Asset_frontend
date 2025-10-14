import React from "react";
import { useParams } from "react-router-dom";

import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
const AdminDashboard = () => {
    const data = useParams();
    console.log(data);

    return (
        
              <div className="container-fluid p-3">
            <div className="mb-4">
                <BarChart />
            </div>

            <div className="mb-4">
                <PieChart />
            </div>
        </div>

       
      
    
    );
};

export default AdminDashboard;
