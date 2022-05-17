const {
    pool
} = require("../../config/database");



// 1. 테이블 조회 : select all + 쿼리 스트링
exports.selectStudents01 = async function (connection, studentName) { 
    const selectAllstudentsQuery = `select * from Students;`;
    const selectAllstudentByNameQuery = `select * from Students where studentName = ?;`;
    const Params = [studentName]; // Params가 물음표(?)를 찾아감

    // 이제 두가지 가능성. studentName이 있냐 없냐. if문 사용 -> 삼항연산자로 수정
    let Query = studentName ? selectAllstudentByNameQuery : selectAllstudentsQuery;

    // if (!studentName){
    //   Query = selectAllstudentsQuery
    // }else{
    //   Query = selectAllstudentByNameQuery
    // }

    const rows = await connection.query(Query, Params);

    return rows;
};


// 테이블 조회 : select all + path variable
exports.selectStudents = async function (connection, studentIdx) { 
    const Query = `select * from Students where studentIdx = ?;`; 
    const Params = [studentIdx]; 

    const rows = await connection.query(Query, Params);

    return rows;
};

// 데이터 생성 : insert
exports.insertStudents = async function (
    connection,
    studentName,
    major,
    birth,
    address
) {
    const Query = `insert into Students(studentName, major, birth, address) values (?, ?, ?, ?);`; 
    const Params = [studentName, major, birth, address];

    const rows = await connection.query(Query, Params);

    return rows;
};

// idx 유효성 검증을 위한 메서드
exports.isValidStudentIdx = async function (connection, studentIdx) {
    const Query = `select * from Students where studentIdx = ? and status = "A";`;
    const Params = [studentIdx];

    const [rows] = await connection.query(Query, Params);

    if (rows < 1) {
        return false;
    }
    // return rows;
    return true;
};

// 학생 정보 : update
// 하나만 바꾸고자 하면 나머지가 null이 아닌 원래 값이 되어야 한다
exports.updateStudents = async function (
    connection,
    studentIdx, // 추가 : 검증 필요
    studentName, // 파라미터 필요
    major,
    birth,
    address
) {
    const Query = `update Students set studentName = ifnull(?, studentName), major = ifnull(?, major), birth = ifnull(?, birth), address = ifnull(?, address) where studentIdx = ?;`;
    const Params = [studentName, major, birth, address, studentIdx]; // params 순서 유의

    const rows = await connection.query(Query, Params);

    return rows;
};


// 데이터 삭제 : delete. but 실제는 update하는 개념으로
// 삭제를 한다고 해서 진짜 삭제를 하지 않는다. status 변경!
exports.deleteStudent = async function (connection, studentIdx) {
    // 이미 status가 D인 애를 해도 또 된다! 유효성 검증 쿼리에 조건을 추가해야 한다.
    const Query = `update Students set status = "D" where studentIdx = ?;`;
    const Params = [studentIdx];

    const rows = await connection.query(Query, Params);

    return rows;
};




// =========================================================================
// Test
// =========================================================================


// test01
exports.exampleDao_ex = async function (connection, params) {
    const Query = ``;
    const Params = [];

    const rows = await connection.query(Query, Params);

    return rows;
};

// test02 : select all
exports.exampleDao = async function (connection) { // ( ) params 필요없어서 지움
    const Query = `select * from Students;`; // ;까지
    const Params = [];

    const rows = await connection.query(Query, Params); // ( ) Params 필요없어서 지움 : 이거 안 지운게 원인이었다!!!

    return rows;
};