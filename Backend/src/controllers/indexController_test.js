const {
    pool
} = require("../../config/database");
const {
    logger
} = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");
const indexDao = require("../dao/indexDao");



// =================================================================

// 테이블 조회 : select + 쿼리 스트링
exports.readStudents01 = async function (req, res) {

    // 쿼리 스트링 '파싱'
    const {
        studentName
    } = req.query; // req 객체 안에 있는 쿼리라는 객체에 접근하여 비구조 할당
    // const studentName = req.query.studentName  // 쿼리 객체 안에서 바로 뽑을 수도 있다.
    // console.log(studentName)

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await indexDao.selectStudents01(connection, studentName); // params이 필요해짐. 이름이 있어야 하니까

            return res.send({
                result: rows,
                isSuccess: true,
                code: 200, // 요청 성공 : 200 / 실패시 400번대 코드
                message: "요청 성공",
            });
        } catch (err) {
            logger.error(`readStudents01 Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`readStudents01 DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

// 테이블 조회 : select + path variable
exports.readStudents = async function (req, res) {

    // path variable
    const {
        studentIdx
    } = req.params;

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await indexDao.selectStudents(connection, studentIdx);

            return res.send({
                result: rows,
                isSuccess: true,
                code: 200, 
                message: "요청 성공",
            });
        } catch (err) {
            logger.error(`readStudents Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`readStudents DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

// 데이터 생성 : insert
// 클라이언트에서 데이터를 보내줘야 해 : 패킷의 바디에 데이터를 담아서 보낸다.
exports.createStudent = async function (req, res) {

    const {
        studentName,
        major,
        birth,
        address
    } = req.body; // 파싱 파트가 중요해 보임
    // console.log(studentName, major, birth, address) // 잘 찍힘

    /*
    데이터를 검증하고(형식, 보안 이슈...등), DB에 넣어야 한다. : validation 검증하다
    서버 보안의 기본적 요소!
    */

    // studentName, major, address : 문자열
    // https://www.delftstack.com/ko/howto/javascript/javascript-check-if-string/
    if (
        typeof studentName !== "string" ||
        typeof major !== "string" ||
        typeof address !== "string"
    ) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "값을 정확히 입력해 주세요^^;",
        });
    }

    // birth : YYYY-MM-DD 형식 검사 
    // https://nevergiveup.tistory.com/entry/javascript-%EB%82%A0%EC%A7%9C%ED%98%95%EC%8B%9D-%EC%A0%95%EA%B7%9C%EC%8B%9D-%EC%B2%B4%ED%81%AC%ED%95%98%EA%B8%B0
    var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    // console.log(regex.test("2-09-25"));
    if (!regex.test(birth)) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "날짜 형식을 확인 부탁! ^^;",
        });
    }

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await indexDao.insertStudents(
                connection,
                studentName, // 파라미터 필요
                major,
                birth,
                address
            );

            return res.send({ // result 값을 뿌려줄 것이 없으니 삭제
                isSuccess: true,
                code: 200,
                message: "학생 생성 성공",
            });
        } catch (err) {
            logger.error(`createStudent Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`createStudent DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

// 데이터 정보 업데이트 : update - 하나만 바꾸고 싶은, 여러가지 경우의 수가 있다.
// 어떤 학생인지 지목 필요 : Inx 이용 - path variable 활용 - 하려면 라우터에서 url 조정
exports.updateStudent = async function (req, res) {

    const {
        studentName,
        major,
        birth,
        address
    } = req.body;
    const {
        studentIdx
    } = req.params;

    // 값이 전달되는 경우에만 validation이 걸리게 한다
    if (studentName && typeof studentName !== "string") { // 이름이 전달 됐는데, 형식이 맞지 않을때
        return res.send({
            isSuccess: false,
            code: 400,
            message: "값을 정확히 입력해 주세요^^;",
        });
    }
    if (major && typeof major !== "string") {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "값을 정확히 입력해 주세요^^;",
        });
    }
    if (address && typeof address !== "string") {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "값을 정확히 입력해 주세요^^;",
        });
    }

    // birth : YYYY-MM-DD 형식 검사 
    var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (birth && !regex.test(birth)) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "날짜 형식을 확인 부탁! ^^;",
        });
    }

    // return;  // 포스트맨 테스트 : DB에 접근 못하게 일단 리턴

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            // idx가 유효한지 검증
            const isValidStudentIdx = await indexDao.isValidStudentIdx( // Dao에 새로운 함수를 만들어 유효성 검증
                connection,
                studentIdx
            )
            if (!isValidStudentIdx) {
                return res.send({ // result 값을 뿌려줄 것이 없으니 삭제
                    isSuccess: false,
                    code: 410,
                    message: "유효한 학생 인덱스가 아니야~",
                });
            }

            // postman으로 해보니, 로그에 updateStudent Query error가 뜸. 확인 필요
            // console.log(1); // 1도 안찍힘 -> 위에 문제가 있다! : 여기서 connection을 인자로 주지 않았었다! 추가

            const [rows] = await indexDao.updateStudents(
                connection,
                studentIdx, // 추가 : 검증 필요
                studentName, // 파라미터 필요
                major,
                birth,
                address
            );

            // console.log(2);

            return res.send({ // result 값을 뿌려줄 것이 없으니 삭제
                isSuccess: true,
                code: 200,
                message: "학생 수정 성공",
            });
        } catch (err) {
            logger.error(`updateStudents Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`updateStudents DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

// 데이터 삭제 : delete
exports.deleteStudent = async function (req, res) {
    const {
        studentIdx
    } = req.params;

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            // idx가 유효한지 검증
            const isValidStudentIdx = await indexDao.isValidStudentIdx( 
                connection,
                studentIdx
            )
            if (!isValidStudentIdx) {
                return res.send({ 
                    isSuccess: false,
                    code: 410,
                    message: "유효한 학생 인덱스가 아니야~",
                });
            }

            const [rows] = await indexDao.deleteStudent(connection, studentIdx);

            return res.send({
                isSuccess: true,
                code: 200,
                message: "학생 삭제(status) 성공",
            });
        } catch (err) {
            logger.error(`deleteStudent Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`deleteStudent DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};


// =======================================================================================

// Test Code

// =======================================================================================

// test01
exports.example_01010101 = async function (req, res) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await indexDao.exampleDao(connection, params);

            return res.send({
                result: rows,
                isSuccess: true,
                code: 200, // 요청 성공 : 200 / 실패시 400번대 코드
                message: "요청 성공",
            });
        } catch (err) {
            logger.error(`example Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};


// test02
exports.example_test01 = async function (req, res) {
    return res.send("dummy get 요청 성공👍🥊")

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await indexDao.exampleDao(connection);

            return res.send({
                result: rows,
                isSuccess: true,
                code: 200, // 요청 실패시 400번대 코드
                message: "요청 성공",
            });
        } catch (err) {
            logger.error(`example Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};


// test03 : select all
exports.example = async function (req, res) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await indexDao.exampleDao(connection); // 전체 데이터 조회이니 params 필요 없음

            return res.send({
                result: rows,
                isSuccess: true,
                code: 200, // 요청 성공 : 200 / 실패시 400번대 코드
                message: "요청 성공",
            });
        } catch (err) {
            logger.error(`example Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};