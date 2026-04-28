pipeline {
    agent any

    stages {

        stage('Build Docker') {
            steps {
                sh 'docker build -t notes-app .'
            }
        }

        stage('Deploy K8s') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }
    }
}