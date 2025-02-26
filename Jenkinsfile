pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-noble'
            args '--network qatw-primeira-edicao_skynet -v $WORKSPACE/.env:/app/.env'
        }
    }

    stages {
        stage('Load Env Vars') {
            steps {
                sh 'export $(grep -v "^#" /app/.env | xargs)'
            }
        }
        
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}