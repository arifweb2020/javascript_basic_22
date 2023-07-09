<script>
const apiData = [
 {
        'id': 'e3153d72b6834a5f9ca8cc95ae1e47ee',
        'name': 'env1',
        'profileTemplateId': 'environment',
 
        'namespaces': [
            {
                'created': '2023-01-05T22:37:11.237829',
                'labels': [
                    'label_1',
                    'label_2',
                    'label_3'
                ],
                'memory_bytes': 123456789,
                'millicpus': 100,
                'namespace': 'default_ns_0',
                'status': 'active'
            },
           
        ],
        'pods': [
            {
                'memory_bytes': 12345678,
                'millicpus': 1000,
                'namespace': 'ns_1',
                'node': 'node_1',
                'workload': 'wl1',
                'pod': 'default_pod_0',
                'ready': '2/2',
                'restarts': 0,
                'status': 'active'
            },

        ]
    },
    {
     
        'id': 'e3153d72b6834a5f9ca8cc95ae1e47ee',
        'name': 'env2',
        'profileTemplateId': 'environment',
       
        'namespaces': [
            {
                'created': '2023-01-05T22:37:11.237829',
                'labels': [
                    'label_1',
                    'label_2',
                    'label_3'
                ],
                'memory_bytes': 123456789,
                'millicpus': 100,
                'namespace': 'env_1_ns_0',
                'status': 'active'
            },

        ]
    },
    {
       
        'id': 'e3153d72b6834a5f9ca8cc95ae1e47ee',
        'name': 'env3',
        'profileTemplateId': 'environment',
   
        'namespaces': [
            {
                'created': '2023-01-05T22:37:11.237829',
                'labels': [
                    'label_1',
                    'label_2',
                    'label_3'
                ],
                'memory_bytes': 123456789,
                'millicpus': 100,
                'namespace': 'env_2_ns_0',
                'status': 'active'
            },
 
        ],
        'pods': [
            {
                'memory_bytes': 12345678,
                'millicpus': 1000,
                'namespace': 'ns_1',
                'node': 'node_1',
                'owner': 'owner',
                'pod': 'env_2_pod_0',
                'ready': '2/2',
                'restarts': 0,
                'status': 'active'
            },
           
        ]
    }
];

const groupedData = apiData.reduce((acc, curr) => {
  if (!acc[curr.profileTemplateId]) {
    acc[curr.profileTemplateId] = []
  }
  acc[curr.profileTemplateId].push(curr)
  return acc
}, {})

console.log(groupedData)

const categories= [];
let index = 0;
//groupedData.forEach((item) => {

for (let i in groupedData){

    categories.push({
      id: ++index,
      title: Object.keys(groupedData),
      category: [{
                        id:`0${++index}`,
                        title: 'Filter by Creator',
                        subCategory: [
                            {
                                id:`00${++index}`,
                                title: groupedData.name,
                            },
                           
                        ]
                    },
],
    });
 
}

console.log(categories);

</script>
