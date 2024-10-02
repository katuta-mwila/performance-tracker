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
    this.addBlankRecord()
  }

  addRecord(record){
    this.records.push(record)
    record.performanceGroup = this
    record.index = this.records.length - 1
  }

  addBlankRecord(){
    const record = new MetricRecord()
    this.addRecord(record)
    return record
  }

  getStats(){
    let min = null
    let max = null
    let total = 0
    let validRecords = 0

    for (let i = 0; i < this.records.length; i++){

      if (!this.records[i].hasValidValue()) continue
      let value = Number(this.records[i].value)

      min = min == null ? value : Math.min(min, value)
      max = max == null ? value : Math.max(max, value)
      total += value
      validRecords++
    }

    min = min == null ? 'N/A' : min
    max = max == null ? 'N/A' : max
    let mean = validRecords == 0 ? 'N/A' : total / validRecords

    return {min, max, mean}
  }
}


export class MetricRecord{
  performanceGroup
  date
  value = ''
  element
  index
  constructor(){
  }

  hasValidValue(){
    return (this.value !== '' && !Number(this.value).isNan)
  }

}