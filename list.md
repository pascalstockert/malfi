# Lists and interactions

## What are lists?

Lists should contain nothing but nodes and a HEAD-pointer. A node without either a predecessor or successor will point to `undefined`. Nodes are doubly linked to their respective predecessor and successor. Additionally, another doubly linked relation to a child node is possible. The HEAD indicates which node is in context ("active").

### Basic list
A possible basic list looks like this:
```
#- Node 1
|
#- Node 2
| \_ Node 2.1
| |_ Node 2.2
|
#- Node 3 <--HEAD
```

### Interactions
#### Addition and Deletion
Nodes can be added as well as deleted. The node will be added after the HEAD. Deleting a node which has children assigned will conclude in all nodes associated being deleted.

#### Arrangement
Individual nodes of a list should be re-arrangeable. The parent of a node is interchangeable as well, making it fully movable. Children of a node can be moved individually as well as part of a group containing all other children of respective parent.
