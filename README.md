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

# setup loki and promtail
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install loki grafana/loki-stack --set grafana.enabled=false

# setup grafana 
helm install grafana grafana/grafana

# check 
kubectl get pods
kubectl get svc

# port forwarding
kubectl port-forward svc/prometheus-grafana 3000:80 --address 0.0.0.0



# Download Loki Config


wget https://raw.githubusercontent.com/grafana/loki/v2.8.0/cmd/loki/loki-local-config.yaml -O loki-config.yaml

Run Loki Docker container

docker run -d --name loki -v $(pwd):/mnt/config -p 3100:3100 grafana/loki:2.8.0 --config.file=/mnt/config/loki-config.yaml

# Download Promtail Config

wget https://raw.githubusercontent.com/grafana/loki/v2.8.0/clients/cmd/promtail/promtail-docker-config.yaml -O promtail-config.yaml

# Run Promtail Docker container

docker run -d --name promtail -v $(pwd):/mnt/config -v /var/log:/var/log --link loki grafana/promtail:2.8.0 --config.file=/mnt/config/promtail-config.yaml




