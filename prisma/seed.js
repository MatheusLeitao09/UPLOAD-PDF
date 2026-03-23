import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela aluno...');

    await prisma.aluno.deleteMany();
    console.log('📦 Inserindo novos registros...');

    await prisma.aluno.createMany({
        data: [
            {
                nome: 'Ana Silva',
                escola: 'Escola Técnica Estadual',
                turma: '3º A - Informática',
                foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
            },
            {
                nome: 'Bruno Oliveira',
                escola: 'Colégio Tiradentes',
                turma: '2º B',
                foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno',
            },
            {
                nome: 'Carla Souza',
                escola: 'Escola Técnica Estadual',
                turma: '3º A - Informática',
                foto: null, // Campo opcional
            },
            {
                nome: 'Diego Santos',
                escola: 'Instituto Federal',
                turma: '1º C - Mecatrônica',
                foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
            },
            {
                nome: 'Elena Martins',
                escola: 'Colégio Dom Bosco',
                turma: '9º Ano',
                foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
