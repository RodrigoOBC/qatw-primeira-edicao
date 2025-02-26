pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-noble'
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
        stage('Carregar .env') {
            steps {
                script {
                    def envFile = readFile('.env').trim()
                    envFile.split("\n").each { line ->
                        def (key, value) = line.tokenize('=')
                        env[key] = value
                    }
                    echo "Variável carregada: ${env.CPF}"
                }
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

