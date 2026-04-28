pipeline {
    agent any

    environment {
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {

        stage('Build Docker') {
            steps {
                sh 'eval $(minikube docker-env) && docker build -t notes-app .'
            }
        }

        stage('Deploy K8s') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
                sh 'kubectl rollout restart deployment notes-app'
            }
        }
    }
}