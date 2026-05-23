
#!/usr/bin/env groovy
/**
 * Jenkins Pipeline Template for React Projects
 * -------------------------------------------
 * Secure, parameterized, and reusable Jenkins pipeline for React CI/CD.
 *
 * Best Practices:
 * - Uses Jenkins credentials for secrets.
 * - Parameterized for per-tenant customization.
 * - Inline documentation for maintainability.
 *
 * Usage:
 * 1. Copy and customize for each tenant.
 * 2. Store secrets in Jenkins Credentials Manager.
 * 3. Place React project in the specified directory.
 */
pipeline {
    agent any
    parameters {
        string(name: 'NODE_VERSION', defaultValue: '18', description: 'Node.js version')
        string(name: 'BUILD_DIR', defaultValue: 'build', description: 'Build output directory')
    }
    environment {
        REACT_APP_SECRET = credentials('REACT_APP_SECRET')
    }
    stages {
        stage('Setup Node.js') {
            steps {
                sh 'nvm install ${params.NODE_VERSION}'
                sh 'nvm use ${params.NODE_VERSION}'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Add deployment steps here (e.g., Docker build/push, k8s apply, etc.)'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build Docker test'){
     sh 'docker build -t react-test -f Dockerfile.test --no-cache .'
    }
    stage('Docker test'){
      sh 'docker run --rm react-test'
    }
    stage('Clean Docker test'){
      sh 'docker rmi react-test'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t react-app --no-cache .'
        sh 'docker tag react-app localhost:5000/react-app'
        sh 'docker push localhost:5000/react-app'
        sh 'docker rmi -f react-app localhost:5000/react-app'
      }
    }
  }
  catch (err) {
    throw err
  }
}