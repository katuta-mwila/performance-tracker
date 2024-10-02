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
  pgContent.className = 'pg-content df g40'
  element.appendChild(pgContent)

  const pgLeft = document.createElement('div')
  pgLeft.classList = 'pg-left vert-flex g15'
  pgContent.appendChild(pgLeft)

  const nameInput = document.createElement('input')
  nameInput.className = 'text-input-1 performance-name-input'
  nameInput.value = group.name
  nameInput.onchange = function(e){
    console.log("onchange")
    group.name = e.target.value
    loadGroup(parentElement, group)
  }
  pgLeft.appendChild(nameInput)

  const recordSection = document.createElement('div')
  recordSection.className = 'record-section vert-flex g10'
  pgLeft.appendChild(recordSection)

  for (let i = 0; i < group.records.length; i++){
    console.log("loading records")
    loadRecord(recordSection, group.records[i])
  }

  const stats = statsElement(group)
  pgContent.appendChild(stats)
  
}

function statsElement(group){
  const element = document.createElement('div')
  element.className = 'pg-right'
  element.innerHTML = 'Stats'

  const table = document.createElement('div')
  table.className = 'stats-table '
  element.appendChild(table)

  const stats = group.getStats()

  addStatRow(table, "Min", stats.min)
  addStatRow(table, "Max", stats.max)
  addStatRow(table, "Average", stats.mean)

  return element
}

function addStatRow(table, key, value){
  const element = document.createElement('div')
  element.className = 'stat-row df'
  table.appendChild(element)

  const left = document.createElement('div')
  left.className = 'col1'
  left.innerHTML = '<p>' + key + '</p>'

  const right = document.createElement('div')
  right.className = 'col2'
  right.innerHTML = '<p>' + value + '</p>'

  element.append(left, right)
}

function loadRecord(parentElement, record){
  const recordElement = initElement(parentElement, record, 'div')
  recordElement.className = 'record df g10 aic'

  const indexElement = document.createElement('div')
  indexElement.className = 'record-index'
  indexElement.innerHTML = '<p>' + (record.index + 1) + '.<p>'
  recordElement.appendChild(indexElement)

  const recordInput = document.createElement('input')
  recordInput.className = 'text-input-1 record-input'
  recordInput.value = record.value
  recordElement.appendChild(recordInput)
  recordInput.onchange = function(e){
    record.value = e.target.value
    console.log(record)
    console.log(record.performanceGroup.getStats())
    loadGroup(document.getElementById('performance'), record.performanceGroup)
  }

  if (record.index + 1 === record.performanceGroup.records.length){
    const plus = document.createElement('i')
    plus.className = 'fa-solid fa-plus record-plus'
    recordElement.appendChild(plus)
    plus.onclick = function(){
      record.performanceGroup.addBlankRecord()
      loadGroup(document.getElementById('performance'), record.performanceGroup)
    }
  }
  
}

function initElement(parentElement, obj, tag='div'){
  if (obj.element == null){
    obj.element = document.createElement(tag)
    
  }
  parentElement.appendChild(obj.element)
  obj.element.innerHTML = ''
  return obj.element
}

addGroupButton.onclick = function(){
  const group = new PerformanceGroup(collection)
  group.name = "New Performance Group"

  collection.addGroup(group)
  loadPerformance()
}

addGroupButton.click()