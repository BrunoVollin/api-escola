import { Class, Student, Teacher, Test, Database } from './index'
import TestStudent from './TestStudents';


async function resetDatabase() {
    await Database.sync({ force: true });
}

export default async function dataSet() {

    await resetDatabase();

    try {
        const professorMariana = await Teacher.create({
            first: 'Mariana',
            last: 'Silva',
            email: 'mariana.silva@university.com',
            password: "123"
        });

        const classBancoDeDados2 = await Class.create({
            name: 'Banco de Dados 2',
            description: 'Disciplina de banco de dados avançado',
        });

        await classBancoDeDados2.setTeacher(professorMariana);


        const joaoSantos = await Student.create({
            first: 'João',
            last: 'Santos',
            email: 'joao.santos@student.com',
            password: "123"
        });

        const mariaSilva = await Student.create({
            first: 'Maria',
            last: 'Silva',
            email: 'maria.silva@student.com',
            password: "123"
        });

        const lucasOliveira = await Student.create({
            first: 'Lucas',
            last: 'Oliveira',
            email: 'lucas.oliveira@student.com',
            password: "123"
        });

        const pedroGomes = await Student.create({
            first: 'Pedro',
            last: 'Gomes',
            email: 'pedro.gomes@student.com',
            password: "123"
        });

        const luciaAraujo = await Student.create({
            first: 'Lúcia',
            last: 'Araújo',
            email: 'lucia.araujo@student.com',
            password: "123"
        });

        const testJson = await Test.create({
            name: 'JSON',
            description: 'Teste de conhecimentos sobre JSON',
            value: 10,
            score: 10,
        });
        testJson.setClass(classBancoDeDados2);
        testJson.setTeacher(professorMariana);


        await classBancoDeDados2.addStudent(joaoSantos);
        await classBancoDeDados2.addStudent(mariaSilva);
        await classBancoDeDados2.addStudent(lucasOliveira);
        await classBancoDeDados2.addStudent(pedroGomes);
        await classBancoDeDados2.addStudent(luciaAraujo);


        await testJson.addStudent(joaoSantos);
        await testJson.addStudent(mariaSilva);
        await testJson.addStudent(lucasOliveira);
        await testJson.addStudent(pedroGomes);
        await testJson.addStudent(luciaAraujo);

        await TestStudent.update({ grade: 10 }, { where: { studentId: joaoSantos.id, testId: testJson.id } });
        await TestStudent.update({ grade: 8 }, { where: { studentId: mariaSilva.id, testId: testJson.id } });
        await TestStudent.update({ grade: 7 }, { where: { studentId: lucasOliveira.id, testId: testJson.id } });
        await TestStudent.update({ grade: 5 }, { where: { studentId: pedroGomes.id, testId: testJson.id } });
        await TestStudent.update({ grade: 3 }, { where: { studentId: luciaAraujo.id, testId: testJson.id } });

        


    } catch (e) {
        console.log(e)
    }

}

dataSet()