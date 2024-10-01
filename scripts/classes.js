export class PerformanceCollection{
  groups = []
  constructor(){

  }

  addGroup(group){
    group.collection = this
    this.groups.push(group)
  }
}

export class PerformanceGroup{
  collection
  name
  metric
  records = []
  element
  constructor(){
  }
}


export class MetricRecord{
  performanceGroup
  date
  value
  element
  constructor(){
  }
}