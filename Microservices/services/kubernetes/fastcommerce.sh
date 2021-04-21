#!/bin/bash


files=`ls */*.yml`
declare -a names=("auth" "product" "cart" "bill" "delivery" "backup")

function create() {
    for file in $files
    do
        kubectl create -f $file
    done
}

function createOne() {
    for file in `ls ${1}/*.yml`
    do
      kubectl create -f $file
    done
}

function delete() {
    for name in "${names[@]}"
    do
      kubectl delete pod $name "${name}-db"
      kubectl delete svc $name "${name}-db"
    done
}

function deleteOne() {
  kubectl delete pod $1 "${1}-db"
  kubectl delete svc $1 "${1}-db"
}



case $1 in
    -create | -c)
        if [ $2 ]
        then
          createOne $2
        else
          create
        fi       
    ;;
    -delete | -d)
        if [ $2 ]
        then
          deleteOne $2
        else
          delete
        fi
    ;;
    esac
