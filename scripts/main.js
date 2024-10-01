import { PerformanceCollection, PerformanceGroup, MetricRecord } from "./classes";

const collection = new PerformanceCollection()
const addGroupButton = document.getElementById('add-new-group')
const perfElement = document.getElementById('performance')

//loads the content inside of the #performance section
function loadPerformance(){
  for (let i = 0; i < collection.groups.length; i++){
    loadGroup(perfElement, collection.groups[i])
  }
}

function loadGroup(parentElement, group){
  const element = initElement(parentElement, group)
  element.className = 'performance-group'
  
  const pgHead = document.createElement('div')
  pgHead.className = 'pg-head'
  pgHead.innerHTML = group.name
  element.appendChild(pgHead)

  const pgContent = document.createElement('div')
  pgContent.className = 'pg-content'
  element.appendChild(pgContent)
  
}

function initElement(parentElement, obj, tag='div'){
  if (obj.element == null){
    obj.element = document.createElement(tag)
    parentElement.appendChild(obj.element)
  }
  obj.element.innerHTML = ''
  return obj.element
}

addGroupButton.onclick = function(){
  const group = new PerformanceGroup(collection)
  group.name = "New Performance Group"

  collection.addGroup(group)
  loadPerformance()
}