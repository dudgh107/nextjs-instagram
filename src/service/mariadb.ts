import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port : 3307,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'naviko_db',
    connectionLimit: 2
});
console.log('is this called ?');

export async function test001() {
    let conn;
    try {

        console.log('stsrt');
        conn = await pool.getConnection();
        //const rows = await conn.query("SELECT id FROM member");
        // rows: [ {val: 1}, meta: ... ]
        console.log('sts--22');
        const rowsData = await conn.query('SELECT id FROM member');
        console.log('row data: ',rowsData);
        return rowsData;

    } catch (err) {
        console.log('error here : ', err);
        throw err;
    } finally {
        if (conn) {
            conn.release(); //release to pool
        }
    }

}

export async function selectEmail(email:string) {
    let conn, rows;
    try {

        console.log('stsrt');
        conn = await pool.getConnection();
        //const rows = await conn.query("SELECT id FROM member");
        // rows: [ {val: 1}, meta: ... ]
        rows = await conn.query('SELECT CAST(count(*) as CHAR) cnt FROM member where email1 = ?', [email]);
        console.log('rows : ', rows);
    } catch (err) {
        console.log('error here : ', err);
        throw err;
    } finally {
        if (conn) {
            conn.release(); //release to pool
        }
        return rows[0];
    }

}


export async function saveMember(email:string, password:string) {
    let conn;
    try {

        let cnt = await selectEmail(email);
        console.log('cnt='+cnt);

        console.log('cnt22='+JSON.stringify(cnt));
        if(Number(cnt.cnt)  > 0){
            console.log('return cnt='+cnt);
            return {msg:'중복된 이메일입니다.'};
        }
        console.log('cnt33='+cnt);

        conn = await pool.getConnection();

        //ID, NAME은 현재 사용안함
        const rowsData = await conn.query('INSERT INTO member(id, password, name, email1) VALUES(?, ?, ?, ?)',
            ['', password, '', email]
        );

        console.log('row data: ',rowsData);
        return;

    } catch (err) {
        console.log('error here : ', err);
        throw err;
    } finally {
        if (conn) {
            conn.release(); //release to pool
        }
    }

}