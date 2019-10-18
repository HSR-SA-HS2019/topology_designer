
node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'which docker'
      sh 'printenv'
    }
    stage('Deploy Docker Frontend'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -f frontend/Dockerfile  -t topology-designer-frontend --no-cache .'
        sh 'docker tag topology-designer-frontend localhost:5000/topology-designer-frontend'
        sh 'docker push localhost:5000/topology-designer-frontend'
        sh 'docker rmi -f topology-designer-frontend localhost:5000/topology-designer-frontend'
      }
    }

    stage('Deploy Docker Backend'){
        sh 'docker build -f backend/src/Dockerfile  -t topology-designer-backend --no-cache .'
        sh 'docker tag topology-designer-backend localhost:5000/topology-designer-backend'
        sh 'docker push localhost:5000/topology-designer-backend'
        sh 'docker rmi -f topology-designer-backend localhost:5000/topology-designer-backend'
    }

  }
  catch (err) {
    throw err
  }
}