pipeline {
    agent any

    environment {
        PLAYWRIGHT_BROWSERS_PATH = "/root/.cache/ms-playwright"
        GITHUB_TOKEN = credentials('github-tokens')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ragulravi3020/parabank-playwright-tests.git', credentialsId: 'github-tokens'
            }
        }

        stage('Install Dependencies') {
            steps {
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
