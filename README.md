# Product Details Webpage — Git, Jenkins and Kubernetes

## Objective
Build a responsive webpage displaying product names, prices and details. Maintain code with Git/GitHub, configure Jenkins CI, package the app with Docker and deploy it using Kubernetes.

## Technologies
- HTML: webpage structure
- CSS: styling and responsive layout
- JavaScript: product detail popup
- Git/GitHub: version control and remote repository
- Jenkins: CI/CD pipeline automation
- Docker: container image
- Kubernetes: container deployment and service

## 1. Run the webpage (no Jenkins needed)
Easiest: open `index.html` in a browser.
Or run this in the project folder:
```bash
python -m http.server 8000
```
Open `http://localhost:8000`.

## 2. Git and GitHub
Create an empty GitHub repository named `product-details-webpage`. Run:
```bash
git init
git add .
git commit -m "Create product details webpage"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/product-details-webpage.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub username. For later updates:
```bash
git add .
git commit -m "Update product webpage"
git push
```

## 3. Docker (optional local test)
With Docker Desktop installed and running:
```bash
docker build -t product-details-web .
docker run --rm -p 8080:80 product-details-web
```
Open `http://localhost:8080`.

## 4. Jenkins CI/CD
The `Jenkinsfile` is a Declarative Pipeline with these stages:
1. Checkout — retrieves source code from GitHub.
2. Validate source — checks the HTML, CSS and JavaScript files.
3. Build Docker image — creates the webpage container image.
4. Push Docker image — authenticates to Docker Hub and uploads the image.
5. Deploy to Kubernetes — applies the Deployment and Service, then waits for rollout.

### Jenkins configuration (when Jenkins is available)
1. Install Jenkins and suggested plugins: Pipeline, Git and Credentials Binding.
2. Ensure the Jenkins agent has Git, Docker CLI with access to a Docker daemon, `kubectl`, and network access to the Kubernetes cluster.
3. Add Jenkins credential ID `dockerhub-creds` of type **Username with password**. Use your Docker Hub username and access token.
4. Add Jenkins credential ID `kubeconfig` of type **Secret file**, containing the Kubernetes cluster kubeconfig.
5. Edit `IMAGE_NAME` in `Jenkinsfile`, replacing `YOUR_DOCKERHUB_USERNAME`.
6. Push the project to GitHub. In Jenkins choose **New Item → Pipeline → Pipeline script from SCM → Git**, enter the repository URL, branch `main`, and Script Path `Jenkinsfile`.
7. Save and select **Build Now**. Check **Console Output** for each stage.

Important: a Jenkinsfile defines the pipeline; it does not mean the pipeline has run. Jenkins needs a working Docker daemon, `kubectl`, valid credentials and access to a Kubernetes cluster.

## 5. Kubernetes
- `k8s/deployment.yaml` creates two application Pod replicas.
- `k8s/service.yaml` exposes the Pods through a NodePort Service on port `30080`.

For a manual deployment after building and pushing your image, replace `IMAGE_PLACEHOLDER` in `k8s/deployment.yaml` with `YOUR_DOCKERHUB_USERNAME/product-details-web:TAG`, then run:
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get deployments
kubectl get pods
kubectl get services
```
With Minikube, try `minikube service product-details-service`. Access depends on your cluster configuration.

## 6. If Jenkins is not working on the exam PC
You can still demonstrate the webpage and explain the prepared automation:
- Open `index.html` and demonstrate the four product cards and View details popups.
- Show your Git commands and GitHub repository, if pushed.
- Open `Jenkinsfile` and explain the five pipeline stages.
- Show the two Kubernetes YAML files. Explain that Deployment maintains two replicas and Service exposes the app.
- Be truthful: explain that the Jenkins pipeline configuration is prepared, but the local Jenkins environment prevented execution. Do not claim a successful build or deployment unless it actually ran.

## 7. Short exam explanation
"My project is a Product Details Webpage developed using HTML, CSS and JavaScript. It displays product names, prices and descriptions in responsive cards. When a user clicks View details, JavaScript opens a popup with additional information. I used Git for version control and GitHub as the remote repository. For CI/CD, I prepared a Jenkins Declarative Pipeline. It checks out the source, validates files, builds a Docker image, pushes it to Docker Hub and deploys it to Kubernetes. Kubernetes uses a Deployment with two replicas and a NodePort Service to expose the application."

## 8. Common viva questions
**1. What is Git?** A distributed version control system used to track source-code changes.  
**2. What is GitHub?** An online platform for hosting Git repositories and collaboration.  
**3. What is CI?** Continuous Integration automatically integrates and validates code changes.  
**4. What is Jenkins?** An automation server used to run build, test and deployment pipelines.  
**5. What is a Jenkinsfile?** A text file that defines a Jenkins Pipeline as code.  
**6. What is Docker?** A platform for packaging applications and dependencies into container images.  
**7. What is Kubernetes?** A container orchestration platform used to deploy, scale and manage containers.  
**8. What is a Pod?** The smallest deployable unit in Kubernetes; it can contain one or more containers.  
**9. What is a Deployment?** A Kubernetes resource that manages Pods and maintains the desired replica count.  
**10. What is a Service?** A stable network endpoint for accessing a set of Pods.  
**11. Why two replicas?** To improve availability and maintain more than one running instance.  
**12. What is NodePort?** A Service type that exposes an application on a port of each cluster node.  
**13. CI vs CD?** CI integrates and validates code; CD automates delivery or deployment of validated changes.  
**14. What if a Pod fails?** The Deployment controller attempts to maintain the required number of Pods.  
**15. Why a Dockerfile?** It gives repeatable instructions for building the application image.

## Project flow
Developer changes code → Git commit/push → GitHub → Jenkins checkout → validation → Docker build → Docker Hub push → Kubernetes Deployment → Service → User.
