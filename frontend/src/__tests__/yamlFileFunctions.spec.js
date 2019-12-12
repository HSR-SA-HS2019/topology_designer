import React from 'react';
import {exportTopology, importTopology} from '../functions/YamlFileFunctions';
import yamljs from "yamljs";

let Topology = '---\n' +
    'description: foo bar\n' +
    'virtual_network_devices:\n' +
    '  Network Device0:\n' +
    '    type: csr1000v\n' +
    'docker_containers:\n' +
    '  Container1:\n' +
    '    type: hsrnetwork/network-ninja\n' +
    'virtual_machines:\n' +
    '  Linux1:\n' +
    '    type: cloudinf_ubuntu_v2\n' +
    'connections:\n' +
    '  - Network Device0: 1\n' +
    '    Linux1: 1\n' +
    '  - Network Device0: 2\n' +
    '    Container1: 1\n' +
    '\n' +
    'running_configs:\n' +
    '  Container1:\n' +
    '    - interface_number: 1\n' +
    '      ipv4address: 192.168.10.10\n' +
    '      gatewayv4: 192.168.10.1\n' +
    '  Linux1:\n' +
    '    - interface_number: 1\n' +
    '      ipv4address: 10.1.1.10\n' +
    '      gatewayv4: 10.1.1.1\n';

let yamlData = yamljs.parse(Topology);

let emptyTopology = '---\n' +
    'description: foo bar\n' +
    'connections:\n' +
    '\n' +
    'running_configs:\n';
let emptyData = yamljs.parse(emptyTopology);

let garbageTopology = '---\n' +
    'description: foo bar\n' +
    'connections:\n' +
    '\n' +
    'running_configs:\n' +
    'garbageStuff bli bla blub';

let device_data = [
    {
        icon: "http://localhost:8000/images/images/iconfinder_networking_icons-04_575175.png",
        name: "virtual_network_devices"
    },
    {
        icon: "http://localhost:8000/images/images/docker-icon.png",
        name: "docker_containers"
    },
    {
        icon: "http://localhost:8000/images/images/iconfinder_linux_tox_386476.png",
        name: "virtual_machines"
    }
];

let edges = [
    {
        from: 0,
        gatewayFrom: "",
        gatewayTo: "10.1.1.1",
        id: 3,
        ipAddressFrom: "",
        ipAddressTo: "10.1.1.10",
        label: "",
        portFrom: 1,
        portTo: 1,
        to: 2
    },
    {
        from: 0,
        gatewayFrom: "",
        gatewayTo: "192.168.10.1",
        id: 4,
        ipAddressFrom: "",
        ipAddressTo: "192.168.10.10",
        label: "",
        portFrom: 2,
        portTo: 1,
        to: 1}
];
let nodes = [
    {
        group: "virtual_network_devices",
        id: 0,
        image: "http://localhost:8000/images/images/iconfinder_networking_icons-04_575175.png",
        label: "Network Device0",
        runConfig: "",
        shape: "image",
        type: "csr1000v"
    },
    {
        group: "docker_containers",
        id: 1,
        image: "http://localhost:8000/images/images/docker-icon.png",
        label: "Container1",
        runConfig: "",
        shape: "image",
        type: "hsrnetwork/network-ninja"
    },
    {
        group: "virtual_machines",
        id: 2,
        image: "http://localhost:8000/images/images/iconfinder_linux_tox_386476.png",
        label: "Linux1",
        runConfig: "",
        shape: "image",
        type: "cloudinf_ubuntu_v2"
    }
];

let topology_name = 'foo bar';

test('exportTopology', () => {
    expect(exportTopology(nodes, edges, topology_name)).toEqual(Topology);
});

test('empty exportTopology', () => {
    expect(exportTopology([], [], topology_name)).toEqual(emptyTopology);
});

test('importTopology', () => {
    expect(importTopology(yamlData, device_data)).toEqual({topology_name, nodes, edges});
});

test('empty importTopology', () => {
    let data = importTopology(emptyData, device_data);
    expect(data.topology_name).toEqual(topology_name);
    expect(data.nodes).toEqual([]);
    expect(data.edges).toEqual([]);
});

test('garbage importTopology', () => {
    let data = importTopology(garbageTopology, device_data);
    expect(data.topology_name).toEqual(undefined);
    expect(data.nodes).toEqual([]);
    expect(data.edges).toEqual([]);
});