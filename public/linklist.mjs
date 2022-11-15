export class LinkList {
    constructor(first){
        this.head=first
        this.length=1;
    }
    pushElement (newNode) {
        let currentNode = this.head
        for (let i = 0; i< this.length-1; i++){
            currentNode=currentNode.nextNode
        }
        currentNode.nextNode=newNode
      this.length++
    }
    getElement (index) {
      let currentNode= this.head
      if (index>= this.length){
        console.log("failure")
        return null
      }
      for (let i=0; i< index; i++){
        currentNode=currentNode.nextNode
      }
      return currentNode
    }
    removeElement(index){
      let currentNode = this.head
      let next = null;
      if (index>=this.length || index < 0){
        console.log("failure")
        return null
      }
      for (let i=0; i< index-1; i++){
        currentNode=currentNode.nextNode
      }
      next=currentNode.nextNode
      currentNode.nextNode=next.nextNode
      this.length--
    }
    insertElement(index, node){
      if (index> this.length){
        console.log("failure")
        return null
      }
      if (index < 0){
        node.nextNode = this.head
        this.head=node
        this.length++
      }
      else{
        let currentNode=this.head
        for (let i=0; i< index; i++){
          currentNode=currentNode.nextNode
        }
        node.nextNode=currentNode.nextNode
        currentNode.nextNode=node
        this.length++
      }
    }
    swapElements(index1, index2){
      let nodeA = this.getElement(index1)
      let nodeB = this.getElement(index2)
      console.log(nodeA+" "+nodeB)
      let dataC=nodeA.nodeData
      nodeA.nodeData=nodeB.nodeData
      nodeB.nodeData=dataC
    }
    head;
    length;
}

export class ListNode {
    constructor(data){
        this.nodeData=data
        this.nextNode=null
    }
    nodeData;
    nextNode
}