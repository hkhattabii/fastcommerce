function delete {

}

$authFiles = Get-ChildItem ./auth
$productFiles = Get-ChildItem ./product


foreach ($file in $authFiles) {
    kubectl delete -f ./auth/$file --ignore-not-found=true
}

foreach ($file in $authFiles) {
    kubectl create -f ./auth/$file
}


foreach ($file in $productFiles) {
    kubectl delete -f ./product/$file --ignore-not-found=true
}

foreach ($file in $productFiles) {
    kubectl create -f ./product/$file
}


kubectl get pods
kubectl get svc

