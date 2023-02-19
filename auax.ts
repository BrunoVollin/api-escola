import Teacher from "./src/models/teacherModel";

async function main() {
    const teacher = await Teacher.login("", "1234");
    console.log(teacher);
}

main();