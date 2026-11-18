pipeline {
    agent any
    environment {
        // Change this to your Docker Hub username/repository.
        IMAGE_NAME = "YOUR_DOCKERHUB_USERNAME/product-details-web"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Validate source') {
            steps {
                sh '''
                    test -f index.html
                    test -f styles.css
                    test -f script.js
                    echo "Webpage source files are present."
                '''
            }
        }
        stage('Build Docker image') {
            steps { sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .' }
        }
        stage('Push Docker image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push "$IMAGE_NAME:$IMAGE_TAG"
                        docker logout
                    '''
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                        sed "s|IMAGE_PLACEHOLDER|$IMAGE_NAME:$IMAGE_TAG|g" k8s/deployment.yaml | kubectl apply -f -
                        kubectl apply -f k8s/service.yaml
                        kubectl rollout status deployment/product-details --timeout=120s
                    '''
                }
            }
        }
    }
    post {
        success { echo 'Build, push and Kubernetes deployment completed successfully.' }
        failure { echo 'Pipeline failed. Check the failed stage and Jenkins console output.' }
    }
}
