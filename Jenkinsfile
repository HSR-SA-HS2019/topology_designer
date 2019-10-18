
node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      echo "Commit ID: ${env.GIT_COMMIT}"
      sh 'docker -v'
      sh 'which docker'
      sh 'printenv'
    }
    stage('Deploy Docker Frontend'){

        sh 'docker build -f frontend/Dockerfile  -t topology-designer-frontend --no-cache .'
        sh 'docker tag topology-designer-frontend localhost:5000/topology-designer-frontend'
        sh 'docker push localhost:5000/topology-designer-frontend'
        echo "sh 'docker commit localhost:5000/topology-designer-frontend martinhug/topology-designer-frontend:${env.GIT_COMMIT}'"
        echo " 'docker push martinhug/topology-designer-frontend:${env.GIT_COMMIT}'"
        sh 'docker rmi -f topology-designer-frontend localhost:5000/topology-designer-frontend'

    }

    stage('Deploy Docker Backend'){
    if(env.BRANCH_NAME == 'master'){
        sh 'docker build -f backend/src/Dockerfile  -t topology-designer-backend --no-cache .'
        sh 'docker tag topology-designer-backend localhost:5000/topology-designer-backend'
        sh 'docker push localhost:5000/topology-designer-backend'
        sh 'docker rmi -f topology-designer-backend localhost:5000/topology-designer-backend' }
    }
    }


  catch (err) {
    throw err
  }
}