pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'deepaktas267'
        DOCKER_HUB_BACKEND_IMAGE = 'deepaktas267/backend-final'
        DOCKER_HUB_FRONTEND_IMAGE = 'deepaktas267/frontend-final'
        KUBECONFIG = credentials('aks-kubeconfig')
        HELM_CHART_VERSION = '0.1.0'
        APP_VERSION = 'v13'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/deepaktas267/tech-demo-final.git',
                            credentialsId: 'github-credentials'
                        ]]
                    ])
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh """
                        cd backend
                        docker build -t $DOCKER_HUB_BACKEND_IMAGE:$APP_VERSION .
                    """
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh """
                        cd frontend
                        docker build -t $DOCKER_HUB_FRONTEND_IMAGE:$APP_VERSION .
                    """
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                            docker push $DOCKER_HUB_BACKEND_IMAGE:$APP_VERSION
                            docker push $DOCKER_HUB_FRONTEND_IMAGE:$APP_VERSION
                        """
                    }
                }
            }
        }

        stage('Install/Upgrade Helm Chart') {
            steps {
                script {
                    sh """
                        export KUBECONFIG=$KUBECONFIG
                        # Install helm if not available
                        if ! command -v helm &> /dev/null; then
                            echo "Helm not found, installing..."
                            curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
                            chmod 700 get_helm.sh
                            ./get_helm.sh
                        fi
                        
                        # Package the helm chart
                        helm package ./recipe-app --version $HELM_CHART_VERSION --app-version $APP_VERSION
                        helm upgrade recipe-app ./recipe-app --namespace recipe-app
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    sh """
                        export KUBECONFIG=$KUBECONFIG
                        echo "Checking deployment status..."
                        helm status recipe-app -n recipe-app
                        kubectl get pods -o wide -n recipe-app
                        kubectl get services -n recipe-app
                    """
                }
            }
        }
    }

    post {
        failure {
            script {
                echo 'Deployment failed, rolling back to the previous version...'
                sh """
                    export KUBECONFIG=$KUBECONFIG
                    if helm history recipe-app -n recipe-app | grep -q FAILED; then
                        echo "Rolling back Helm release..."
                        helm rollback recipe-app -n recipe-app
                    else
                        echo "No previous successful deployment found in Helm history."
                        echo "Checking Kubernetes deployment history..."
                        
                        # Get the previous revision (Avoids Groovy string parsing issues)
                        BACKEND_REVISION=\$(kubectl rollout history deployment recipe-backend -n recipe-app --no-headers | tail -n 2 | head -n 1 | awk '{print \$1}')
                        FRONTEND_REVISION=\$(kubectl rollout history deployment recipe-frontend -n recipe-app --no-headers | tail -n 2 | head -n 1 | awk '{print \$1}')
                        
                        echo "Rolling back backend to revision \$BACKEND_REVISION..."
                        kubectl rollout undo deployment recipe-backend --to-revision=\$BACKEND_REVISION -n recipe-app

                        echo "Rolling back frontend to revision \$FRONTEND_REVISION..."
                        kubectl rollout undo deployment recipe-frontend --to-revision=\$FRONTEND_REVISION -n recipe-app
                    fi
                """
            }
        }
        success {
            echo 'Deployment succeeded!'
        }
    }
}
