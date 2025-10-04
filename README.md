# install minikube and run cluster

curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64

minikube start --memory=4096 --cpus=2

# check nodes 

kubectl get nodes

# create deployment

# apply deployment 
kubectl apply -f deploymentname

# check pod and svc

kubectl get pods
kubectl get svc

# portforwarding 
kubectl port-forward svc/servicename 8080:80 --address 0.0.0.0

# setup prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack

# check prometheus pods
kubectl get pods -n default

# portforwarding for prometheus
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090



