// const express = require('express');

const { QueryTypes } = require('sequelize');
// const router = express.Router();
const sequelize = require('../config/db');

// const connectToDatabase = require('../config/db');

exports.findAll = async(req,res)=>{
    try {
        const startDate = req.query.startDate; // format: 'YYYY-MM-DD HH:mm:ss'
        const endDate = req.query.endDate; 

        const result = await sequelize.query(`
        
SELECT 
[TICKET].[TICKETID],
[TICKET].[CLASSIFICATIONID] AS CLASSIFICATION,
[TICKET].[COMPPHONE] AS MSISDN,
[TICKET].[OWNERGROUP],
[TICKET].[COMMODITYGROUP] AS SERVICE_GROUP,
SUBSTRING([TICKET].[COMMODITY], 1, CHARINDEX('POSTPAID', [TICKET].[COMMODITY]) + 7) AS COMMODITY,
[TICKET].[CREATEDBY],
FORMAT([TICKET].[CREATIONDATE], 'dd-MM-yyyy HH:mm:ss') AS [CREATIONDATE],
FORMAT([TKSTATUS].[CHANGEDATE], 'dd-MM-yyyy HH:mm:ss') AS QUEUED_DATE,
[TKSTATUS].[OWNER] AS QUEUED_OWNER,
[TKSTATUS].[CHANGEBY] AS INPROGRESS_CHANGEBY,
[TKSTATUS].[STATUS],
[FIRST_WORKLOG].[DESCRIPTION] AS FIRST_WORKLOG_DESCRIPTION,
FORMAT([FIRST_WORKLOG].[CREATEDATE], 'dd-MM-yyyy HH:mm:ss') AS [FIRST_WORKLOG_CREATE],
[FIRST_WORKLOG].[MODIFYBY] AS FIRST_WORKLOG_MODIFYBY,
[TICKET].[COMPSTREET] AS VILLAGE,
[TICKET].[COMPDISTRICT] AS DISTRICT,
[TICKET].[COMPPROVINCE] AS PROVINCE,
[TICKET].[COMPLAIN] AS COMPLAIN_BY
FROM [TICKET_DATA].[dbo].[TICKET]
INNER JOIN [TICKET_DATA].[dbo].[TKSTATUS] ON [TICKET].[TICKETID] = [TKSTATUS].[TICKETID]
CROSS APPLY (
SELECT TOP 1 [DESCRIPTION], [CREATEDATE], [MODIFYBY]
FROM [TICKET_DATA].[dbo].[WORKLOG]
WHERE [RECORDKEY] = [TICKET].[TICKETID]
ORDER BY [CREATEDATE]
) AS [FIRST_WORKLOG]
WHERE [TKSTATUS].[CLASS] ='SR' 
AND [TICKET].[OWNERGROUP] LIKE 'TP%' 
AND [TICKET].[CREATIONDATE] BETWEEN $1 AND $2
GROUP BY 
[TICKET].[TICKETID],
[TICKET].[CLASSIFICATIONID],
[TICKET].[COMPPHONE],
[TICKET].[OWNERGROUP],
[TICKET].[COMMODITYGROUP],
[TICKET].[COMMODITY],
[TICKET].[CREATEDBY],
[TICKET].[CREATIONDATE],
[TKSTATUS].[CHANGEDATE],
[TKSTATUS].[OWNER],
[TKSTATUS].[CHANGEBY],
[TKSTATUS].[STATUS],
[FIRST_WORKLOG].[DESCRIPTION],
[FIRST_WORKLOG].[CREATEDATE],
[FIRST_WORKLOG].[MODIFYBY],
[TICKET].[COMPSTREET],
[TICKET].[COMPDISTRICT],
[TICKET].[COMPPROVINCE],
[TICKET].[COMPLAIN]
ORDER BY 
[TICKET].[TICKETID], 
[TKSTATUS].[CHANGEDATE]

        `, {
            bind: [startDate, endDate],
          type: QueryTypes.SELECT,
        });
    
        res.json(result);
      } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.findOne = async(req,res)=>{
    try {
        const startDate = req.query.startDate; // format: 'YYYY-MM-DD HH:mm:ss'
        const endDate = req.query.endDate; 

        const result = await sequelize.query(`
        

        SELECT 
        [TICKET].[TICKETID],
        [TICKET].[CLASSIFICATIONID] AS CLASSIFICATION,
        [TICKET].[COMPPHONE] AS MSISDN,
        [TICKET].[OWNERGROUP],
        [TICKET].[COMMODITYGROUP] AS SERVICE_GROUP,
        SUBSTRING([TICKET].[COMMODITY], 1, CHARINDEX('POSTPAID', [TICKET].[COMMODITY]) + 7) AS COMMODITY,
        [TICKET].[CREATEDBY],
        FORMAT([TICKET].[CREATIONDATE], 'dd-MM-yyyy HH:mm:ss') AS [CREATIONDATE],
        FORMAT([TKSTATUS].[CHANGEDATE], 'dd-MM-yyyy HH:mm:ss') AS QUEUED_DATE,
        [TKSTATUS].[OWNER] AS QUEUED_OWNER,
        [TKSTATUS].[CHANGEBY] AS INPROGRESS_CHANGEBY,
        [TKSTATUS].[STATUS],
        [FIRST_WORKLOG].[DESCRIPTION] AS FIRST_WORKLOG_DESCRIPTION,
        FORMAT([FIRST_WORKLOG].[CREATEDATE], 'dd-MM-yyyy HH:mm:ss') AS [FIRST_WORKLOG_CREATE],
        [FIRST_WORKLOG].[MODIFYBY] AS FIRST_WORKLOG_MODIFYBY,
        [TICKET].[COMPSTREET] AS VILLAGE,
        [TICKET].[COMPDISTRICT] AS DISTRICT,
        [TICKET].[COMPPROVINCE] AS PROVINCE,
        [TICKET].[COMPLAIN] AS COMPLAIN_BY
    FROM [TICKET_DATA].[dbo].[TICKET]
    INNER JOIN [TICKET_DATA].[dbo].[TKSTATUS] ON [TICKET].[TICKETID] = [TKSTATUS].[TICKETID]
    CROSS APPLY (
        SELECT TOP 1 [DESCRIPTION], [CREATEDATE], [MODIFYBY]
        FROM [TICKET_DATA].[dbo].[WORKLOG]
        WHERE [RECORDKEY] = [TICKET].[TICKETID]
        ORDER BY [CREATEDATE]
    ) AS [FIRST_WORKLOG]
    WHERE [TKSTATUS].[CLASS] ='SR' 
    AND [TICKET].[OWNERGROUP] LIKE 'TP%' 
    AND [TICKET].[CREATIONDATE] BETWEEN '2023-10-16 00:00' AND '2023-10-23 00:00'
    GROUP BY 
        [TICKET].[TICKETID],
        [TICKET].[CLASSIFICATIONID],
        [TICKET].[COMPPHONE],
        [TICKET].[OWNERGROUP],
        [TICKET].[COMMODITYGROUP],
        [TICKET].[COMMODITY],
        [TICKET].[CREATEDBY],
        [TICKET].[CREATIONDATE],
        [TKSTATUS].[CHANGEDATE],
        [TKSTATUS].[OWNER],
        [TKSTATUS].[CHANGEBY],
        [TKSTATUS].[STATUS],
        [FIRST_WORKLOG].[DESCRIPTION],
        [FIRST_WORKLOG].[CREATEDATE],
        [FIRST_WORKLOG].[MODIFYBY],
        [TICKET].[COMPSTREET],
        [TICKET].[COMPDISTRICT],
        [TICKET].[COMPPROVINCE],
        [TICKET].[COMPLAIN]
    ORDER BY 
        [TICKET].[TICKETID], 
        [TKSTATUS].[CHANGEDATE]
    

        `, {
          type: QueryTypes.SELECT,
        });
    
        res.json(result);
      } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

// exports.findAll = async(req,res)=>{
//     try {
//         const connection = await connectToDatabase();
    
//         const request = new Request(`
          
// SELECT 
// [TICKET].[TICKETID],
// [TICKET].[CLASSIFICATIONID] AS CLASSIFICATION,
// [TICKET].[COMPPHONE] AS MSISDN,
// [TICKET].[OWNERGROUP],
// [TICKET].[COMMODITYGROUP] AS SERVICE_GROUP,
// SUBSTRING([TICKET].[COMMODITY], 1, CHARINDEX('POSTPAID', [TICKET].[COMMODITY]) + 7) AS COMMODITY,
// [TICKET].[CREATEDBY],
// FORMAT([TICKET].[CREATIONDATE], 'dd-MM-yyyy HH:mm:ss') AS [CREATIONDATE],
// FORMAT([TKSTATUS].[CHANGEDATE], 'dd-MM-yyyy HH:mm:ss') AS QUEUED_DATE,
// [TKSTATUS].[OWNER] AS QUEUED_OWNER,
// [TKSTATUS].[CHANGEBY] AS INPROGRESS_CHANGEBY,
// [TKSTATUS].[STATUS],
// [FIRST_WORKLOG].[DESCRIPTION] AS FIRST_WORKLOG_DESCRIPTION,
// FORMAT([FIRST_WORKLOG].[CREATEDATE], 'dd-MM-yyyy HH:mm:ss') AS [FIRST_WORKLOG_CREATE],
// [FIRST_WORKLOG].[MODIFYBY] AS FIRST_WORKLOG_MODIFYBY,
// [TICKET].[COMPSTREET] AS VILLAGE,
// [TICKET].[COMPDISTRICT] AS DISTRICT,
// [TICKET].[COMPPROVINCE] AS PROVINCE,
// [TICKET].[COMPLAIN] AS COMPLAIN_BY
// FROM [TICKET_DATA].[dbo].[TICKET]
// INNER JOIN [TICKET_DATA].[dbo].[TKSTATUS] ON [TICKET].[TICKETID] = [TKSTATUS].[TICKETID]
// CROSS APPLY (
// SELECT TOP 1 [DESCRIPTION], [CREATEDATE], [MODIFYBY]
// FROM [TICKET_DATA].[dbo].[WORKLOG]
// WHERE [RECORDKEY] = [TICKET].[TICKETID]
// ORDER BY [CREATEDATE]
// ) AS [FIRST_WORKLOG]
// WHERE [TKSTATUS].[CLASS] ='SR' 
// AND [TICKET].[OWNERGROUP] LIKE 'TP%' 
// AND [TICKET].[CREATIONDATE] BETWEEN '2023-10-16 00:00' AND '2023-10-23 00:00'
// GROUP BY 
// [TICKET].[TICKETID],
// [TICKET].[CLASSIFICATIONID],
// [TICKET].[COMPPHONE],
// [TICKET].[OWNERGROUP],
// [TICKET].[COMMODITYGROUP],
// [TICKET].[COMMODITY],
// [TICKET].[CREATEDBY],
// [TICKET].[CREATIONDATE],
// [TKSTATUS].[CHANGEDATE],
// [TKSTATUS].[OWNER],
// [TKSTATUS].[CHANGEBY],
// [TKSTATUS].[STATUS],
// [FIRST_WORKLOG].[DESCRIPTION],
// [FIRST_WORKLOG].[CREATEDATE],
// [FIRST_WORKLOG].[MODIFYBY],
// [TICKET].[COMPSTREET],
// [TICKET].[COMPDISTRICT],
// [TICKET].[COMPPROVINCE],
// [TICKET].[COMPLAIN]
// ORDER BY 
// [TICKET].[TICKETID], 
// [TKSTATUS].[CHANGEDATE]

//         `, (err, rowCount, rows) => {
//           if (err) {
//             console.error('Error executing SQL query:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//           } else {
//             res.json(rows);
//           }
    
//           connection.close();
//         });
    
//         connection.execSql(request);
//       } catch (error) {
//         console.error('Error connecting to the database:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
// }