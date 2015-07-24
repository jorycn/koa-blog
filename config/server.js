module.exports = function () {
    var
        path = require('path'),
        root = path.dirname(__dirname),
        resourceDir = path.join(root, 'resource');

    return {
        secret: ["Mo's Blog"], // session ��Կ
        db: { // ���ݿ�����
            uri: 'mongodb://localhost:27017/blog',
            opts: {
                user: '',
                pass: ''
            }
        },
        port: 3000, // ����˿�
        dir: { // Ŀ¼����
            root: root,
            model: path.join(root, 'models'),
            view: path.join(root, 'views'),
            controller: path.join(root, 'controllers'),
            resource: resourceDir,
            lib: path.join(root, 'libs'),
            upload: path.join(resourceDir, 'upload')
        },
        adminPath: '/admin/', // ��̨·��
        uploadFixUrl: 'http://localhost:3000', // �ϴ��ļ�����·�����ϴ��ļ��Ǹ��ݵ�ǰdomain���ɵľ�̬·�����������������̶�Ψһһ����ַ�õ�
        exceptDir: 'except' // model �� controller ��read dir�ų���Ŀ¼����
    };

};