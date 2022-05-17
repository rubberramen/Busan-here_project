module.exports = function (app) {
    const index = require("../controllers/indexController"); // controller
    const jwtMiddleware = require("../../config/jwtMiddleware");

    // 라우터 정의 : 요청에 맞춰 뿌려주는 것
    // app.HTTP메서드(uri, 컨트롤러 콜백함수)



    // 테이블 조회 : select + 쿼리 스트링
    app.get("/students01", index.readStudents01);


    // 테이블 조회 + path variable
    app.get("/students/:studentIdx", index.readStudents);


    // 데이터 생성 : insert
    app.post("/students", index.createStudent);


    // 데이터 수정 : update + path variable
    app.patch("/students/:studentIdx", index.updateStudent);


    // 데이터 삭제 : delete
    app.delete("/students/:studentIdx", index.deleteStudent);


// ======================================================================
// Test
// ======================================================================

    // test01
    app.get("/dummy01", index.example_test01);


    // db test: select
    app.get("/dummy", index.example);


    // test part
    app.get("/test01", function (req, res, next) {
        res.send("ㅋㅋㅋㅋ ㅎㅎㅎㅎ : )")
    })
};