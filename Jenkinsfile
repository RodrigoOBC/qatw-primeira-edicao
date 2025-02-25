pipeline {
    agent any

    stages {
        stage('Node.js deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npm run test:all'
            }
        }
    }
}