import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DR.css';

const StokeBloodList = () => {
 
  const [bloodCount, setBloodCount] = useState({
    "A+": 0, "A-": 0,
    "B+": 0, "B-": 0,
    "O+": 0, "O-": 0,
    "AB+": 0, "AB-": 0
  });
  
 
  const navigate = useNavigate();

  useEffect(() => {
    getCand();
  }, []);
const cancelData = () => {
  setBloodCount({
    "A+": 0, "A-": 0,
    "B+": 0, "B-": 0,
    "O+": 0, "O-": 0,
    "AB+": 0, "AB-": 0
  });
}



  const getCand = async () => {
    try {
      const res = await fetch("http://localhost:50333/bloodRecord", {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      });

    

      if (!res.ok) {
        throw new Error("Server error");
      }

      const result = await res.json();

      const count = { ...bloodCount };

       let c=0
      result.forEach((item) => {
        if (count[item.bloodGrp] !== undefined) {
          const qty = Number(item.Qty) || 0;

          if (item.inventoryType === "in") {
            count[item.bloodGrp] += qty;
            c=+qty
          } else if (item.inventoryType === "out") {
            count[item.bloodGrp] -= qty;
            c=-qty
          }
        }
      });

      setBloodCount(count);
      console.warn(count['A+'])
     
  const response = await fetch("http://localhost:50333/bloodstock", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
  "A+": count["A+"],
  "A-": count["A-"],
  "B+": count["B+"],
  "B-": count["B-"],
  "O+": count["O+"],
  "O-": count["O-"],
  "AB+": count["AB+"],
  "AB-": count["AB-"]
}),

    });


    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <table className='tbl2'>
        <thead>
          <tr>
            <th className='t2'>Blood Grp</th>
            <th className='t2'>Qty</th>
            <th className='t2'>Expiry</th>
            <th className='t2'>Status</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(bloodCount).map(([group, qty]) => {
            const status =
              qty > 15 ? "InStock"
              : qty >= 5 ? "LowStock"
              : "VeryLow";

            return (
              <tr key={group} className={status}>
                <td className='t2'>{group}</td>
                <td className='t2'>{qty}</td>
                <td className='t2'>20 Feb 2026</td>
                <td className='t3'>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StokeBloodList;
