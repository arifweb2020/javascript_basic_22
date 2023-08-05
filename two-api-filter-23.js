const x = [
  {
    
      "selection": {
        "namespace": "arif",
        "selection_method": {
          "count": null,
          "type": "SELECTION_COUNT"
        },
        "targets": [
          {
            "container_selection_method": {
              "container_name_list": ["hello-openshift"],

            },
            "process_input_method": {
              "pod_name_list": ["example-5fb6876865-bjnns"],
         
            }
          },
          {
            "container_selection_method": {
              "container_name_regex": "hello-openshift",
              "type": "CONTAINER_NAME_REGEX"
            },
            "process_input_method": {
              "pod_name_list": ["example-5fb6876865-r7lkc"],
              "type": "POD_NAME_LIST"
            }
          }
        ]
      }
    },
    "delay": {
      "units": "SEC",
      "value": 0
    },
    "description": "Container Kill",
    "name": "Container Kill",
    "run_when": "AfterPrevious",
    "timeout": {
      "units": "SEC",
      "value": null
    },

  },
  {
    "config": {
      "container_kill": {
        "signal": "SIGKILL",
        "timeout": {
          "units": "SEC",
          "value": null
        }
      },
      "selection": {
        "namespace": "arif",
        "selection_method": {
          "count": null,
          "type": "SELECTION_COUNT"
        },
        "targets": [
          {
            "container_selection_method": {
              "container_name_list": ["hello-openshift"],
            
            },
            "process_input_method": {
              "pod_name_list": ["example-5fb6876865-bjnns"],
        
            }
          },
          {
            "container_selection_method": {
              "container_name_regex": "hello-openshift",
             
            },
            "process_input_method": {
              "pod_name_list": ["example-5fb6876865-r7lkc"],
              
            }
          }
        ]
      }
    },
    "delay": {
      "units": "SEC",
      "value": 0
    },
    "description": "Container Kill",
    "name": "Network Latency",
    "run_when": "AfterPrevious",
    "timeout": {
      "units": "SEC",
      "value": null
    },
  
  },

];

const m = ["arif", "arran", "test"];

const t = scenario?.find(i => m.some(namespace => i.config.selection?.namespace?.includes(namespace)));

console.log(t);

const impairmentAction = scenario?.find(ele => {
        const values = Array.isArray(i.name) ? i.name : [i.name];
        return values.some(value => (ele.config.selection?.namespace || "").includes(value));
    });
