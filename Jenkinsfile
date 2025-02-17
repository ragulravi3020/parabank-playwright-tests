pipeline {
    agent any

    environment {
        PLAYWRIGHT_BROWSERS_PATH = "/root/.cache/ms-playwright"  // Adjust if needed
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ragulravi3020/parabank-playwright-tests.git'  // Replace with actual repo
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodeInstalled = sh(script: 'node -v', returnStatus: true)
                    if (nodeInstalled != 0) {
                        sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | bash -'
                        sh 'sudo apt-get install -y nodejs'
                    }
                }
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=junit'
            }
        }

        stage('Publish Test Results') {
            steps {
                junit '**/test-results/*.xml'
            }
        }
    }
}
