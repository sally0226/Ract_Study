function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

const mariadb = require('mariadb');
const vals = {
    DBHost:'127.0.0.1',
    DBPort: 3306,
    DBUser: 'todolist_admin',
    DBPass: '0000',

};
const pool = mariadb.createPool({
    host: vals.DBHost, port: vals.DBPort,
    user: vals.DBUser, password: vals.DBPass,
    connectionLimit: 5
});

async function GetToDoList() {
    let conn, rows;
    const today = getFormatDate(new Date());
    const LoadTodayList = 'SELECT * FROM list WHERE date = "' + "2021-02-28"+'"';
    //const today_s = today.getFullYear + "-" + today.getMonth + "-" + today.getDay;
    //console.log(LoadTodayList); 
    try {
        conn = await pool.getConnection();
        conn.query('USE todolist');
        rows = await conn.query(LoadTodayList);
    }
    catch(err){
        throw err;
    }
    finally {
        if (conn) conn.end();
        //console.log(rows);
        return rows;
    }
}

module.exports = {
    getToDoList: GetToDoList
}