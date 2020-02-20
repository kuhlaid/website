const app_data = {
  "example_code": {
    "/src": {
      "example_code": {
        "contents": "",
        "filename": "example_code",
        "title": "/path/to/your/project/example_code"
      }
    },
    "/src/example_code": {
      "advanced_tutorials": {
        "contents": "",
        "filename": "advanced_tutorials",
        "title": "/path/to/your/project/advanced_tutorials"
      },
      "dependency_management": {
        "contents": "",
        "filename": "dependency_management",
        "title": "/path/to/your/project/dependency_management"
      },
      "tutorials": {
        "contents": "",
        "filename": "tutorials",
        "title": "/path/to/your/project/tutorials"
      },
      "third_party_tutorials": {
        "contents": "",
        "filename": "third_party_tutorials",
        "title": "/path/to/your/project/third_party_tutorials"
      },
      "getting_started": {
        "contents": "",
        "filename": "getting_started",
        "title": "/path/to/your/project/getting_started"
      }
    },
    "/src/example_code/advanced_tutorials": {
      "content_negotiation": {
        "contents": "",
        "filename": "content_negotiation",
        "title": "/path/to/your/project/content_negotiation"
      },
      "creating_a_web_app": {
        "contents": "",
        "filename": "creating_a_web_app",
        "title": "/path/to/your/project/creating_a_web_app"
      },
      "creating_an_api": {
        "contents": "",
        "filename": "creating_an_api",
        "title": "/path/to/your/project/creating_an_api"
      },
      "creating_an_spa": {
        "contents": "",
        "filename": "creating_an_spa",
        "title": "/path/to/your/project/creating_an_spa"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation": {
      "user_profiles": {
        "contents": "",
        "filename": "user_profiles",
        "title": "/path/to/your/project/user_profiles"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles": {
      "part_5": {
        "contents": "",
        "filename": "part_5",
        "title": "/path/to/your/project/part_5"
      },
      "part_2": {
        "contents": "",
        "filename": "part_2",
        "title": "/path/to/your/project/part_2"
      },
      "part_3": {
        "contents": "",
        "filename": "part_3",
        "title": "/path/to/your/project/part_3"
      },
      "part_4": {
        "contents": "",
        "filename": "part_4",
        "title": "/path/to/your/project/part_4"
      },
      "part_1": {
        "contents": "",
        "filename": "part_1",
        "title": "/path/to/your/project/part_1"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_5": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport response from \"./response.ts\";\nDrash.Http.Response = response;\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "user": {
        "contents": "<user>\n\t<alias>{{ alias }}</alias>\n\t<name>{{ name }}</name>\n\t<api_key>**********</api_key>\n\t<api_secret>**********</api_secret>\n</user>\n",
        "extension": "xml",
        "filename": "user.xml",
        "title": "/path/to/your/project/user.xml"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "users_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  public GET() {\n    let userId = this.request.getPathParam(\"id\");\n    let user = this.getUser(userId);\n\n    if (!user) {\n      throw new Drash.Exceptions.HttpException(404);\n    }\n\n    switch (this.request.response_content_type) {\n      case \"text/html\":\n        this.response.body = this.generateHtml(user);\n        break;\n      case \"text/plain\":\n        this.response.body = this.generatePlainText(user);\n        break;\n      case \"application/xml\":\n      case \"text/xml\":\n        this.response.body = this.generateXml(user);\n        break;\n      case \"application/json\":\n      default:\n        this.response.body = this.generateJson(user);\n        break;\n    }\n\n    return this.response;\n  }\n\n  protected getUser(userId) {\n    try {\n      let users = this.readFileContents(\"./users.json\");\n      users = JSON.parse(users);\n      return users[userId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(404, `User with ID \"${userId}\" not found.`);\n    }\n  }\n\n  protected generateHtml(user) {\n    try {\n      let html = this.readFileContents(\"./user.html\");\n      html = html\n        .replace(/\\{\\{ alias \\}\\}/, user.alias)\n        .replace(/\\{\\{ name \\}\\}/, user.name);\n      return html;\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(500, error.message);\n    }\n  }\n\n  protected generateJson(user) {\n    user.api_key = \"**********\";\n    user.api_secret = \"**********\";\n    return user;\n  }\n\n  protected generatePlainText(user) {\n    return `${user.alias}, Name: ${user.name}, API Key: **********, API Secret: **********`;\n  }\n\n  protected generateXml(user) {\n    try {\n      let xml = this.readFileContents(\"./user.xml\");\n      xml = xml\n        .replace(/\\{\\{ alias \\}\\}/, user.alias)\n        .replace(/\\{\\{ name \\}\\}/, user.name);\n      return xml;\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(500, error.message);\n    }\n  }\n\n  protected readFileContents(file: string) {\n    let fileContentsRaw = Deno.readFileSync(file);\n    const decoder = new TextDecoder();\n    let decoded = decoder.decode(fileContentsRaw);\n    return decoded;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tprofile_card.html\n\tusers.json\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "response": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class Response extends Drash.Http.Response {\n  public generateResponse(): any {\n    let contentType = this.headers.get(\"Content-Type\")\n\n    switch (contentType) {\n      case \"application/json\":\n        return JSON.stringify(this.body);\n      case \"application/xml\":\n      case \"text/html\":\n      case \"text/xml\":\n      case \"text/plain\":\n        return this.body;\n    }\n\n    throw new Drash.Exceptions.HttpResponseException(400, `Response Content-Type \"${contentType}\" unknown.`);\n  }\n}\n\n",
        "extension": "ts",
        "filename": "response.ts",
        "language": "typescript",
        "title": "/path/to/your/project/response.ts"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_2": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tusers.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_3": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "users_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  public GET() {\n    let userId = this.request.getPathParam(\"id\");\n    this.response.body = this.getUser(userId);\n    return this.response;\n  }\n\n  protected getUser(userId) {\n    let user = null;\n\n    try {\n      let users = this.readFileContents(\"./users.json\");\n      users = JSON.parse(users);\n      user = users[userId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(400, `Error getting user with ID \"${userId}\". Error: ${error.message}.`);\n    }\n\n    if (!user) {\n      throw new Drash.Exceptions.HttpException(404, `User with ID \"${userId}\" not found.`);\n    }\n\n    return user;\n  }\n\n  protected readFileContents(file: string) {\n    let fileContentsRaw = Deno.readFileSync(file);\n    const decoder = new TextDecoder();\n    let decoded = decoder.decode(fileContentsRaw);\n    return decoded;\n  }\n}\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tusers.json\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_4": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "user": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://images.bewakoof.com/original/avengers-logos-mini-backpack-avl-essential-printed-mini-backpacks-183193-1524728878.jpg\" alt=\"Avengers\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t\t<div class=\"font-bold text-xl my-6\">{{ alias }}</div>\n\t\t\t\t\t<div class=\"mb-6\">\n\t\t\t\t\t\t<div class=\"flex my-2\">\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base font-bold\">Name</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">{{ name }}</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"flex my-2\">\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base font-bold\">API Key</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">**********</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"flex my-2\">\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base font-bold\">API Secret</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">**********</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#marvel</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "html",
        "filename": "user.html",
        "title": "/path/to/your/project/user.html"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "users_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  public GET() {\n    let userId = this.request.getPathParam(\"id\");\n    let user = this.getUser(userId);\n\n    switch (this.request.response_content_type) {\n      case \"text/html\":\n        this.response.body = this.generateHtml(user);\n        break;\n      case \"application/json\":\n      default:\n        this.response.body = this.generateJson(user);\n        break;\n    }\n\n    return this.response;\n  }\n\n  protected getUser(userId) {\n    let user = null;\n\n    try {\n      let users = this.readFileContents(\"./users.json\");\n      users = JSON.parse(users);\n      user = users[userId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(400, `Error getting user with ID \"${userId}\". Error: ${error.message}.`);\n    }\n\n    if (!user) {\n      throw new Drash.Exceptions.HttpException(404, `User with ID \"${userId}\" not found.`);\n    }\n\n    return user;\n  }\n\n  protected generateHtml(user) {\n    try {\n      let html = this.readFileContents(\"./user.html\");\n      html = html\n        .replace(/\\{\\{ alias \\}\\}/, user.alias)\n        .replace(/\\{\\{ name \\}\\}/, user.name);\n      return html;\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(500, error.message);\n    }\n  }\n\n  protected generateJson(user) {\n    user.api_key = \"**********\";\n    user.api_secret = \"**********\";\n    return user;\n  }\n\n  protected readFileContents(file: string) {\n    let fileContentsRaw = Deno.readFileSync(file);\n    const decoder = new TextDecoder();\n    let decoded = decoder.decode(fileContentsRaw);\n    return decoded;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tuser.html\n\tusers.json\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_1": {
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tusers.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app": {
      "hello_world": {
        "contents": "",
        "filename": "hello_world",
        "title": "/path/to/your/project/hello_world"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world": {
      "part_2": {
        "contents": "",
        "filename": "part_2",
        "title": "/path/to/your/project/part_2"
      },
      "part_3": {
        "contents": "",
        "filename": "part_3",
        "title": "/path/to/your/project/part_3"
      },
      "part_4": {
        "contents": "",
        "filename": "part_4",
        "title": "/path/to/your/project/part_4"
      },
      "part_1": {
        "contents": "",
        "filename": "part_1",
        "title": "/path/to/your/project/part_1"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_2": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\"><%= body %></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#resources</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs/dejs.ts\";\n\nclass Response extends Drash.Http.Response {\n  public async generateHtmlResponse(): Promise<any> {\n    let rawOutput = await renderFile(Deno.cwd() + \"/index.ejs\", {\n      body: this.body\n    });\n    let html = rawOutput.toString();\n    return html;\n  }\n}\n\nDrash.Http.Response = Response;\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "run": {
        "contents": "deno --allow-net --allow-env --allow-read app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "txt",
        "filename": "output.txt",
        "title": "/path/to/your/project/output.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_3": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\"><%= body %></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"mb-2\"><strong>POST Response: </strong></p>\n\t\t\t\t\t\t<p id=\"post_message\" class=\"text-grey-darker text-base\">...</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<label class=\"block text-grey-darker text-sm font-bold mb-2\" for=\"name\">Name</label>\n\t\t\t\t\t\t<input class=\"shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline\" id=\"name\" type=\"text\" placeholder=\"Name\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4 text-right\">\n\t\t\t\t\t\t<button class=\"bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full\" style=\"outline: none\" onclick=\"post()\">POST</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#resources</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<script src=\"https://unpkg.com/axios/dist/axios.min.js\"><//script>\n\t\t<script>\n\t\t\tlet post = function() {\n\t\t\t\tlet postBody = {\n\t\t\t\t\tresponse_content_type: \"application/json\",\n\t\t\t\t\tname: document.getElementById(\"name\").value\n\t\t\t\t};\n\t\t\t\taxios.post(\"/\", postBody)\n\t\t\t\t\t.then(function (response) {\n\t\t\t\t\t\tdocument.getElementById(\"post_message\").innerHTML = response.data.body;\n\t\t\t\t\t})\n\t\t\t\t\t.catch(function (error) {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\t\t<//script>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs/dejs.ts\";\n\nclass Response extends Drash.Http.Response {\n  public async generateHtmlResponse(): Promise<any> {\n    let rawOutput = await renderFile(Deno.cwd() + \"/index.ejs\", {\n      body: this.body\n    });\n    let html = rawOutput.toString();\n    return html;\n  }\n}\n\nDrash.Http.Response = Response;\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n  public POST() {\n    this.response.body = \"POST request received!\";\n    let name = this.request.body_parsed.name;\n    if (name) {\n      this.response.body += ` Thanks for the request, ${name}!`;\n    }\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "run": {
        "contents": "deno --allow-net --allow-env --allow-read app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "txt",
        "filename": "output.txt",
        "title": "/path/to/your/project/output.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_4": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\"><%= body %></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"mb-2\"><strong>POST Response: </strong></p>\n\t\t\t\t\t\t<p id=\"post_message\" class=\"text-grey-darker text-base\">...</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<label class=\"block text-grey-darker text-sm font-bold mb-2\" for=\"name\">Name</label>\n\t\t\t\t\t\t<input class=\"shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline\" id=\"name\" type=\"text\" placeholder=\"Name\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4 text-right\">\n\t\t\t\t\t\t<button class=\"bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full\" style=\"outline: none\" onclick=\"post()\">POST</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#resources</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<script src=\"https://unpkg.com/axios/dist/axios.min.js\"><//script>\n\t\t<script>\n\t\t\tlet post = function() {\n\t\t\t\tlet postBody = {\n\t\t\t\t\tresponse_content_type: \"application/json\",\n\t\t\t\t\tname: document.getElementById(\"name\").value\n\t\t\t\t};\n\t\t\t\taxios.post(\"/\", postBody)\n\t\t\t\t\t.then(function (response) {\n\t\t\t\t\t\tdocument.getElementById(\"post_message\").innerHTML = response.data.body;\n\t\t\t\t\t})\n\t\t\t\t\t.catch(function (error) {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\t\t<//script>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs/dejs.ts\";\n\nclass Response extends Drash.Http.Response {\n  public async generateHtmlResponse(): Promise<any> {\n    let rawOutput = await renderFile(Deno.cwd() + \"/index.ejs\", {\n      body: this.body\n    });\n    let html = rawOutput.toString();\n    return html;\n  }\n}\n\nDrash.Http.Response = Response;\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n  public POST() {\n    this.response.body = \"POST request received!\";\n    let name = this.request.body_parsed.name;\n    if (name) {\n      this.response.body += ` Thanks for the request, ${name}!`;\n    }\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource],\n  logger: new Drash.CoreLoggers.ConsoleLogger({\n    enabled: true,\n    level: \"debug\",\n    tag_string: \"{datetime} | {level} | \",\n    tag_string_fns: {\n      datetime() {\n        return new Date().toISOString().replace(\"T\", \" \");\n      }\n    }\n  })\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "sh",
        "filename": "output.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "run": {
        "contents": "deno --allow-net --allow-env --allow-read app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output_post": {
        "contents": "Deno server started at localhost:1337.\n\n2019-04-13 01:57:56.693Z | INFO |  Request received: GET /\n2019-04-13 01:57:56.693Z | DEBUG |  Calling HomeResource.GET() method.\n2019-04-13 01:57:56.693Z | INFO |  Sending response. Content-Type: text/html. Status: 200 (OK).\n2019-04-13 01:57:56.765Z | DEBUG |  /favicon.ico requested.\n2019-04-13 01:57:56.765Z | DEBUG |  All future log messages for /favicon.ico will be muted.\n2019-04-13 01:58:51.026Z | INFO |  Request received: POST /?response_content_type=application/json&name=Eric\n2019-04-13 01:58:51.026Z | DEBUG |  Calling HomeResource.POST() method.\n2019-04-13 01:58:51.026Z | INFO |  Sending response. Content-Type: application/json. Status: 200 (OK).\n",
        "extension": "txt",
        "filename": "output_post.txt",
        "title": "/path/to/your/project/output_post.txt"
      },
      "output_get": {
        "contents": "Deno server started at localhost:1337.\n\n2019-04-13 01:57:56.693Z | INFO |  Request received: GET /\n2019-04-13 01:57:56.693Z | DEBUG |  Calling HomeResource.GET() method.\n2019-04-13 01:57:56.693Z | INFO |  Sending response. Content-Type: text/html. Status: 200 (OK).\n2019-04-13 01:57:56.765Z | DEBUG |  /favicon.ico requested.\n2019-04-13 01:57:56.765Z | DEBUG |  All future log messages for /favicon.ico will be muted.\n",
        "extension": "txt",
        "filename": "output_get.txt",
        "title": "/path/to/your/project/output_get.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_1": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "folder_structure_setup": {
        "contents": "mkdir /path/to/your/project\ncd /path/to/your/project\n",
        "extension": "txt",
        "filename": "folder_structure_setup.txt",
        "title": "/path/to/your/project/folder_structure_setup.txt"
      },
      "run": {
        "contents": "deno --allow-net --allow-env app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "txt",
        "filename": "output.txt",
        "title": "/path/to/your/project/output.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api": {
      "coffee_and_tea": {
        "contents": "",
        "filename": "coffee_and_tea",
        "title": "/path/to/your/project/coffee_and_tea"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea": {
      "part_2": {
        "contents": "",
        "filename": "part_2",
        "title": "/path/to/your/project/part_2"
      },
      "part_3": {
        "contents": "",
        "filename": "part_3",
        "title": "/path/to/your/project/part_3"
      },
      "part_4": {
        "contents": "",
        "filename": "part_4",
        "title": "/path/to/your/project/part_4"
      },
      "part_1": {
        "contents": "",
        "filename": "part_1",
        "title": "/path/to/your/project/part_1"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_2": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport CoffeeResource from \"./coffee_resource.ts\";\nimport TeaResource from \"./tea_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    CoffeeResource,\n    TeaResource\n  ],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tcoffee.json\n\ttea.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_3": {
      "coffee_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class CoffeeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/coffee/:id\",\n    \"/coffee/:id/\"\n  ];\n\n  public GET() {\n    let coffeeId = this.request.getPathParam(\"id\");\n    this.response.body = this.getCoffee(coffeeId);\n    return this.response;\n  }\n\n  protected getCoffee(coffeeId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./coffee.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[coffeeId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting coffee with ID \"${coffeeId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Coffee with ID \"${coffeeId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "coffee_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/coffee_resource.ts"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport CoffeeResource from \"./coffee_resource.ts\";\nimport TeaResource from \"./tea_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    CoffeeResource,\n    TeaResource\n  ],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tcoffee.json\n\tcoffee_resource.ts\n\ttea.json\n\ttea_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "tea_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class TeaResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/tea/:id\",\n    \"/tea/:id/\"\n  ];\n\n  public GET() {\n    let teaId = this.request.getPathParam(\"id\");\n    this.response.body = this.getTea(teaId);\n    return this.response;\n  }\n\n  protected getTea(teaId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./tea.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[teaId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting tea with ID \"${teaId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Tea with ID \"${teaId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "tea_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/tea_resource.ts"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_4": {
      "coffee_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class CoffeeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/coffee/:id\",\n    \"/coffee/:id/\"\n  ];\n\n  public GET() {\n    let coffeeId = this.request.getPathParam(\"id\");\n    this.response.body = this.getCoffee(coffeeId);\n    return this.response;\n  }\n\n  protected getCoffee(coffeeId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./coffee.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[coffeeId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting coffee with ID \"${coffeeId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Coffee with ID \"${coffeeId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "coffee_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/coffee_resource.ts"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport response from \"./response.ts\";\nDrash.Http.Response = response;\n\nimport CoffeeResource from \"./coffee_resource.ts\";\nimport TeaResource from \"./tea_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    CoffeeResource,\n    TeaResource\n  ],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tcoffee.json\n\tcoffee_resource.ts\n\ttea.json\n\ttea_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "response": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class Response extends Drash.Http.Response {\n  public generateResponse(): any {\n    let schema = {\n      status_code: this.status_code,\n      status_message: this.getStatusMessage(),\n      data: this.body,\n      request: {\n        method: this.request.method.toUpperCase(),\n        uri: this.request.uri\n      }\n    };\n\n    return JSON.stringify(schema);\n  }\n}\n",
        "extension": "ts",
        "filename": "response.ts",
        "language": "typescript",
        "title": "/path/to/your/project/response.ts"
      },
      "tea_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class TeaResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/tea/:id\",\n    \"/tea/:id/\"\n  ];\n\n  public GET() {\n    let teaId = this.request.getPathParam(\"id\");\n    this.response.body = this.getTea(teaId);\n    return this.response;\n  }\n\n  protected getTea(teaId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./tea.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[teaId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting tea with ID \"${teaId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Tea with ID \"${teaId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "tea_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/tea_resource.ts"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_1": {
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tcoffee.json\n\ttea.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/dependency_management": {
      "response": {
        "contents": "import Drash from \"../../mod.ts\";\nimport { STATUS_TEXT, Status } from \"../../deps.ts\";\n\n/**\n * @memberof Drash.Http\n * @class Response\n *\n * @description\n *     Response handles sending a response to the client making the request.\n */\nexport default class Response { ... }\n",
        "extension": "ts",
        "filename": "response.ts",
        "language": "typescript",
        "title": "/path/to/your/project/response.ts"
      },
      "deps": {
        "contents": "export {\n  serve,\n  ServerRequest\n} from \"https://deno.land/std@v0.32.0/http/server.ts\";\n\nexport {\n  STATUS_TEXT,\n  Status\n} from \"https://deno.land/std@v0.32.0/http/http_status.ts\";\n\nexport {\n  walkSync\n} from \"https://deno.land/std@v0.32.0/fs/mod.ts\";\n\nexport {\n  runTests,\n  test\n} from \"https://deno.land/std@v0.32.0/testing/mod.ts\";\n\nexport {\n  assertEquals\n} from \"https://deno.land/std@v0.32.0/testing/asserts.ts\";\n\nexport {\n  contentType\n} from \"https://deno.land/std@v0.32.0/media_types/mod.ts\";\n\nexport {\n  BufReader,\n  ReadLineResult\n} from \"https://deno.land/std@v0.32.0/io/bufio.ts\";\n\nexport {\n  StringReader\n} from \"https://deno.land/std@v0.32.0/io/readers.ts\";\n\nexport {\n  MultipartReader\n} from \"https://deno.land/std@v0.32.0/mime/multipart.ts\";\n",
        "extension": "ts",
        "filename": "deps.ts",
        "language": "typescript",
        "title": "/path/to/your/project/deps.ts"
      }
    },
    "/src/example_code/tutorials": {
      "misc": {
        "contents": "",
        "filename": "misc",
        "title": "/path/to/your/project/misc"
      },
      "middleware": {
        "contents": "",
        "filename": "middleware",
        "title": "/path/to/your/project/middleware"
      },
      "resources": {
        "contents": "",
        "filename": "resources",
        "title": "/path/to/your/project/resources"
      },
      "requests": {
        "contents": "",
        "filename": "requests",
        "title": "/path/to/your/project/requests"
      },
      "testing": {
        "contents": "",
        "filename": "testing",
        "title": "/path/to/your/project/testing"
      },
      "logging": {
        "contents": "",
        "filename": "logging",
        "title": "/path/to/your/project/logging"
      },
      "servers": {
        "contents": "",
        "filename": "servers",
        "title": "/path/to/your/project/servers"
      },
      "resource_lifecycle_hooks": {
        "contents": "",
        "filename": "resource_lifecycle_hooks",
        "title": "/path/to/your/project/resource_lifecycle_hooks"
      }
    },
    "/src/example_code/tutorials/misc": {
      "adding_global_members": {
        "contents": "",
        "filename": "adding_global_members",
        "title": "/path/to/your/project/adding_global_members"
      }
    },
    "/src/example_code/tutorials/misc/adding_global_members": {
      "my_thing": {
        "contents": "export default class MyThing {\n  public greet() {\n    return \"Hello from MyThing!\";\n  }\n}\n",
        "extension": "ts",
        "filename": "my_thing.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_thing.ts"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\n// When this file is imported, it will register MyThing as a global member\nimport \"./bootstrap.ts\";\n\nconsole.log(Drash.Members.MyThing.greet());\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tbootstrap.ts\n\tmy_thing.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "bootstrap": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\n// Register MyThing as a global member\nimport myThing from \"./my_thing.ts\";\nDrash.addMember(\"MyThing\", new myThing());\n",
        "extension": "ts",
        "filename": "bootstrap.ts",
        "language": "typescript",
        "title": "/path/to/your/project/bootstrap.ts"
      }
    },
    "/src/example_code/tutorials/middleware": {
      "adding_server_level_middleware": {
        "contents": "",
        "filename": "adding_server_level_middleware",
        "title": "/path/to/your/project/adding_server_level_middleware"
      },
      "introduction": {
        "contents": "",
        "filename": "introduction",
        "title": "/path/to/your/project/introduction"
      },
      "adding_resource_level_middleware": {
        "contents": "",
        "filename": "adding_resource_level_middleware",
        "title": "/path/to/your/project/adding_resource_level_middleware"
      },
      "morgan_style_logging_middleware": {
        "contents": "",
        "filename": "morgan_style_logging_middleware",
        "title": "/path/to/your/project/morgan_style_logging_middleware"
      }
    },
    "/src/example_code/tutorials/middleware/adding_server_level_middleware": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport VerifyTokenMiddleware from \"./verify_token_middleware.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        VerifyTokenMiddleware\n      ]\n    }\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tverify_token_middleware.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "verify_token_middleware": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class VerifyTokenMiddleware extends Drash.Http.Middleware {\n  public run() {\n    let token = this.request.getQueryParam('super_secret_token');\n\n    if (!token) {\n      throw new Drash.Exceptions.HttpMiddlewareException(400, \"Where is the token?\");\n    }\n\n    if (token != \"AllYourBaseAreBelongToUs\") {\n      throw new Drash.Exceptions.HttpMiddlewareException(403, `Mmm... \"${token}\" is a bad token.`);\n    }\n  }\n}\n",
        "extension": "ts",
        "filename": "verify_token_middleware.ts",
        "language": "typescript",
        "title": "/path/to/your/project/verify_token_middleware.ts"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"Hello!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/middleware/introduction": {
      "location_resource_level": {
        "contents": "class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  static middleware = {\n    before_request: [\n      \"MyFirstMiddleware\"\n    ],\n    after_request: [\n      \"MySecondMiddleware\"\n    ]\n  };\n\n  public GET() {\n    this.response.body = \"Hello\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "location_resource_level.ts",
        "language": "typescript",
        "title": "/path/to/your/project/location_resource_level.ts"
      },
      "location_server_level": {
        "contents": "const server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        AuthMiddleware,\n        CacheMiddleware,\n      ],\n      after_request: [\n        SomeOtherMiddleware,\n      ]\n    }\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n",
        "extension": "ts",
        "filename": "location_server_level.ts",
        "language": "typescript",
        "title": "/path/to/your/project/location_server_level.ts"
      },
      "sorting": {
        "contents": "const server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        OneMiddleware,\n        TwoMiddleware\n      ]\n    },\n    resource_level: [\n      RedMiddleware,\n      BlueMiddleware\n    ]\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n",
        "extension": "ts",
        "filename": "sorting.ts",
        "language": "typescript",
        "title": "/path/to/your/project/sorting.ts"
      },
      "location_resource_level_server": {
        "contents": "const server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    resource_level: [\n      MyFirstMiddleware,\n      MySecondMiddleware,\n      MyThirdMiddleware\n    ]\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n",
        "extension": "ts",
        "filename": "location_resource_level_server.ts",
        "language": "typescript",
        "title": "/path/to/your/project/location_resource_level_server.ts"
      }
    },
    "/src/example_code/tutorials/middleware/adding_resource_level_middleware": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport SecretResource from \"./secret_resource.ts\";\nimport VerifyTokenMiddleware from \"./verify_token_middleware.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    resource_level: [\n      VerifyTokenMiddleware\n    ]\n  },\n  resources: [\n    HomeResource,\n    SecretResource\n  ],\n  response_output: \"application/json\",\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tsecret_resource.ts\n\tverify_token_middleware.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "verify_token_middleware": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class VerifyTokenMiddleware extends Drash.Http.Middleware {\n  public run() {\n    let token = this.request.getQueryParam('super_secret_token');\n\n    if (!token) {\n      throw new Drash.Exceptions.HttpMiddlewareException(400, \"Where is the token?\");\n    }\n\n    if (token != \"AllYourBaseAreBelongToUs\") {\n      throw new Drash.Exceptions.HttpMiddlewareException(403, `Mmm... \"${token}\" is a bad token.`);\n    }\n  }\n}\n",
        "extension": "ts",
        "filename": "verify_token_middleware.ts",
        "language": "typescript",
        "title": "/path/to/your/project/verify_token_middleware.ts"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"Hello!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "secret_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class SecretResource extends Drash.Http.Resource {\n\n  static paths = [\"/secret\", \"/secret/\"];\n\n  static middleware = {\n    before_request: [\n      \"VerifyTokenMiddleware\"\n    ]\n  };\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"You have accessed the secret resource!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "secret_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/secret_resource.ts"
      }
    },
    "/src/example_code/tutorials/middleware/morgan_style_logging_middleware": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport MorganStyleLoggingMiddleware from \"./morgan_style_logging_middleware.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        MorganStyleLoggingMiddleware\n      ],\n      after_request: [\n        MorganStyleLoggingMiddleware\n      ]\n    }\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tmorgan_style_logging_middleware.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"Hello!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "morgan_style_logging_middleware": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nconst logger = new Drash.CoreLoggers.ConsoleLogger({\n  enabled: true,\n  level: \"all\",\n  tag_string: \"{datetime} | {level} |\",\n  tag_string_fns: {\n    datetime() {\n      return new Date().toISOString().replace(\"T\", \" \");\n    }\n  }\n});\n\nexport default class MorganStyleLoggingMiddleware extends Drash.Http.Middleware {\n  public run() {\n    if (!this.response) {\n      logger.info(`Request received: ${this.request.method} ${this.request.url}`);\n    }\n    if (this.response) {\n      logger.info(`Response: ${this.response.status_code} ${this.response.getStatusMessage()}`);\n    }\n  }\n}\n",
        "extension": "ts",
        "filename": "morgan_style_logging_middleware.ts",
        "language": "typescript",
        "title": "/path/to/your/project/morgan_style_logging_middleware.ts"
      }
    },
    "/src/example_code/tutorials/resources": {
      "creating_a_resource": {
        "contents": "",
        "filename": "creating_a_resource",
        "title": "/path/to/your/project/creating_a_resource"
      }
    },
    "/src/example_code/tutorials/resources/creating_a_resource": {
      "my_resource_get_post_put_delete": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n\n  public POST() {\n    this.response.body = \"POST request received!\";\n    return this.response;\n  }\n\n  public PUT() {\n    this.response.body = \"PUT request received!\";\n    return this.response;\n  }\n\n  public DELETE() {\n    this.response.body = \"DELETE request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_get_post_put_delete.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_get_post_put_delete.ts"
      },
      "registering_resources": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "registering_resources.ts",
        "language": "typescript",
        "title": "/path/to/your/project/registering_resources.ts"
      },
      "my_resource_path_params": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\n    \"/users/:user_id\",\n    \"/users/:user_id/\",\n  ];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n\n    let userId = this.request.getPathParam('user_id');\n\n    this.response.body += ` Parsing User #${userId} data!`;\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_path_params.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_path_params.ts"
      },
      "my_resource_get_post": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n\n  public POST() {\n    this.response.body = \"POST request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_get_post.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_get_post.ts"
      },
      "my_resource_regular_expression": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\n    \"/(users?)/([0-9]$)\",\n  ];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n\n    let userId = this.request.getPathParam('user_id');\n\n    this.response.body += ` Parsing User #${userId} data!`;\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_regular_expression.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_regular_expression.ts"
      }
    },
    "/src/example_code/tutorials/requests": {
      "handling_url_query_params": {
        "contents": "",
        "filename": "handling_url_query_params",
        "title": "/path/to/your/project/handling_url_query_params"
      },
      "handling_application_json_bodies": {
        "contents": "",
        "filename": "handling_application_json_bodies",
        "title": "/path/to/your/project/handling_application_json_bodies"
      },
      "handling_multipart_form_data_bodies": {
        "contents": "",
        "filename": "handling_multipart_form_data_bodies",
        "title": "/path/to/your/project/handling_multipart_form_data_bodies"
      },
      "handling_application_x_www_form_urlencoded_bodies": {
        "contents": "",
        "filename": "handling_application_x_www_form_urlencoded_bodies",
        "title": "/path/to/your/project/handling_application_x_www_form_urlencoded_bodies"
      },
      "handling_path_params": {
        "contents": "",
        "filename": "handling_path_params",
        "title": "/path/to/your/project/handling_path_params"
      }
    },
    "/src/example_code/tutorials/requests/handling_url_query_params": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users\"\n  ];\n\n  public GET() {\n    let userId = this.request.getUrlQueryParam(\"id\");\n\n    if (!userId) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `id` URL query param.\"\n      );\n    }\n\n    userId = parseInt(userId);\n    if (isNaN(userId)) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `id` URL query param to be a number.\"\n      );\n    }\n\n    this.response.body = `You passed in the following user ID as the URL query param: ${userId}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/requests/handling_application_json_bodies": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/\"\n  ];\n\n  public POST() {\n    const param = this.request.getBodyParam(\"name\");\n\n    if (!param) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `name` body param.\"\n      );\n    }\n\n    this.response.body = `You passed in the following body param: ${param}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/requests/handling_multipart_form_data_bodies": {
      "my_file": {
        "contents": "Hello, world!\n\nI am a simple text file.\n",
        "extension": "txt",
        "filename": "my_file.txt",
        "title": "/path/to/your/project/my_file.txt"
      },
      "files_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/files\"\n  ];\n\n  public POST() {\n    const decoder = new TextDecoder();\n    const file = this.request.getBodyFile(\"my_file\");\n\n    if (!file) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires files to be uploaded via the request body.\"\n      );\n    }\n\n    const outputFile = \"./uploads/my_uploaded_file.txt\";\n\n    Deno.writeFileSync(outputFile, file.content);\n\n    this.response.body = `You uploaded the following to ${outputFile}: `\n      + `\\n${decoder.decode(file.content)}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "files_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/files_resource.ts"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport FilesResource from \"./files_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [FilesResource],\n  memory_allocation: {\n    multipart_form_data: 128\n  },\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "uploads": {
        "contents": "",
        "filename": "uploads",
        "title": "/path/to/your/project/uploads"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\t▾ uploads/\n\t\tmy_uploaded_file.txt\n\tapp.ts\n\tfiles_resource.ts\n\tmy_file.txt\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/tutorials/requests/handling_multipart_form_data_bodies/uploads": {
      "my_uploaded_file": {
        "contents": "Hello, world!\n\nI am a simple text file.\n",
        "extension": "txt",
        "filename": "my_uploaded_file.txt",
        "title": "/path/to/your/project/my_uploaded_file.txt"
      }
    },
    "/src/example_code/tutorials/requests/handling_application_x_www_form_urlencoded_bodies": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/\"\n  ];\n\n  public POST() {\n    const param = this.request.getBodyParam(\"snack\");\n\n    if (!param) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `snack` body param.\"\n      );\n    }\n\n    this.response.body = `You passed in the following body param: ${param}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/requests/handling_path_params": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\"\n  ];\n\n  public GET() {\n    const userId = parseInt(this.request.getPathParam(\"id\"));\n\n    if (isNaN(userId)) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `:id` path param to be a number.\"\n      );\n    }\n\n    this.response.body = `You passed in the following user ID as the path param: ${userId}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/tutorials/testing": {
      "unit_testing": {
        "contents": "",
        "filename": "unit_testing",
        "title": "/path/to/your/project/unit_testing"
      }
    },
    "/src/example_code/tutorials/testing/unit_testing": {
      "tests": {
        "contents": "import { assertEquals } from \"https://deno.land/std/testing/asserts.ts\";\nimport { test } from \"https://deno.land/std/testing/mod.ts\";\n\ntest({\n  name: \"HomeResource - GET /\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), \"Welcome home!\");\n  }\n});\n\ntest({\n  name: \"UsersResource - GET /users/1\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/users/1\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), \"User #1 not found.\");\n  }\n});\n\ntest({\n  name: \"UsersResource - GET /users/1388873\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/users/1388873\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 1388873,\n      name: \"Seller\",\n    });\n  }\n});\n\ntest({\n  name: \"UsersResource - GET /users/1983765\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/users/1983765\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 1983765,\n      name: \"Buyer\",\n    });\n  }\n});\n\ntest({\n  name: \"OrdersResource - GET /orders/1\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/orders/1\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), \"Order #1 not found.\");\n  }\n});\n\ntest({\n  name: \"OrdersResource - GET /orders/1090987\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/orders/1090987\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 1090987,\n      name: \"Gadgets\",\n      quantity: 50,\n      price: 1000\n    });\n  }\n});\n\ntest({\n  name: \"OrdersResource - GET /orders/8878213\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/orders/8878213\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 8878213,\n      name: \"Gizmos\",\n      quantity: 25,\n      price: 2000\n    });\n  }\n});\n",
        "extension": "ts",
        "filename": "tests.ts",
        "language": "typescript",
        "title": "/path/to/your/project/tests.ts"
      },
      "orders_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class OrdersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/orders/:id\",\n    \"/orders/:id/\"\n  ];\n\n  // Simulate a database with order records\n  protected database = {\n    1090987: {\n      id: 1090987,\n      name: \"Gadgets\",\n      quantity: 50,\n      price: 1000\n    },\n    8878213: {\n      id: 8878213,\n      name: \"Gizmos\",\n      quantity: 25,\n      price: 2000\n    },\n  };\n\n  public GET() {\n    this.response.body = this.getOrder(this.request.getPathParam(\"id\"));\n    return this.response;\n  }\n\n  protected getOrder(id) {\n    if (this.database[id]) {\n      return this.database[id];\n    }\n\n    throw new Drash.Exceptions.HttpException(404, `Order #${id} not found.`);\n  }\n}\n",
        "extension": "ts",
        "filename": "orders_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/orders_resource.ts"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport OrdersResource from \"./orders_resource.ts\";\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    HomeResource,\n    OrdersResource,\n    UsersResource\n  ]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  // Simulate a database with user records\n  protected database = {\n    1388873: {\n      id: 1388873,\n      name: \"Seller\",\n    },\n    1983765: {\n      id: 1983765,\n      name: \"Buyer\",\n    },\n  };\n\n  public GET() {\n    this.response.body = this.getUser(this.request.getPathParam(\"id\"));\n    return this.response;\n  }\n\n  protected getUser(id) {\n    if (this.database[id]) {\n      return this.database[id];\n    }\n\n    throw new Drash.Exceptions.HttpException(404, `User #${id} not found.`);\n  }\n}\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\torders_resource.ts\n\trun_tests.ts\n\ttests.ts\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"Welcome home!\";\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "run_tests": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { runTests } from \"https://deno.land/std/testing/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport OrdersResource from \"./orders_resource.ts\";\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    HomeResource,\n    OrdersResource,\n    UsersResource\n  ],\n});\n\n// Run your server\n\nserver.run();\n\n// Import your tests so they can be run\n\nimport \"./tests.ts\";\n\n// Run your tests and then shut down the server when done\n\nrunTests()\n  .then(() => {\n    server.close();\n  });\n",
        "extension": "ts",
        "filename": "run_tests.ts",
        "language": "typescript",
        "title": "/path/to/your/project/run_tests.ts"
      }
    },
    "/src/example_code/tutorials/logging": {
      "logging_to_the_terminal": {
        "contents": "",
        "filename": "logging_to_the_terminal",
        "title": "/path/to/your/project/logging_to_the_terminal"
      },
      "logging_using_log_from_deno_std": {
        "contents": "",
        "filename": "logging_using_log_from_deno_std",
        "title": "/path/to/your/project/logging_using_log_from_deno_std"
      },
      "logging_to_files": {
        "contents": "",
        "filename": "logging_to_files",
        "title": "/path/to/your/project/logging_to_files"
      }
    },
    "/src/example_code/tutorials/logging/logging_to_the_terminal": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource],\n  logger: new Drash.CoreLoggers.ConsoleLogger({\n    enabled: true,\n    level: \"all\",\n    tag_string: \"{datetime} | {level} |\",\n    tag_string_fns: {\n      datetime() {\n        return new Date().toISOString().replace(\"T\", \" \");\n      }\n    }\n  })\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.server.logger.fatal(\"This is a FATAL log message.\");\n    this.server.logger.error(\"This is an ERROR log message\");\n    this.server.logger.warn(\"This is a WARN log message\");\n    this.server.logger.info(\"This is an INFO log message\");\n    this.server.logger.debug(\"This is a DEBUG log message\");\n    this.server.logger.trace(\"This is a TRACE log message\");\n\n    this.response.body = \"GET request received! Also, check your terminal to see the log messages written by this resource.\";\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/logging/logging_using_log_from_deno_std": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport * as log from \"https://deno.land/std/log/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    log.info(\"Setting a response.\");\n\n    this.response.body = \"Hello!\";\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/logging/logging_to_files": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource],\n  logger: new Drash.CoreLoggers.FileLogger({\n    enabled: true,\n    level: \"all\",\n    file: \"./server.log\",\n    tag_string: \"{datetime} | {level} |\",\n    tag_string_fns: {\n      datetime() {\n        return new Date().toISOString().replace(\"T\", \" \");\n      }\n    }\n  })\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tserver.log\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.server.logger.fatal(\"This is a FATAL log message.\");\n    this.server.logger.error(\"This is an ERROR log message\");\n    this.server.logger.warn(\"This is a WARN log message\");\n    this.server.logger.info(\"This is an INFO log message\");\n    this.server.logger.debug(\"This is a DEBUG log message\");\n    this.server.logger.trace(\"This is a TRACE log message\");\n\n    this.response.body = \"GET request received! Also, check your server.log file to see the log messages written by this resource.\";\n\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "server": {
        "contents": "2019-12-27 17:33:32.853Z | INFO | Request received: GET /\n2019-12-27 17:33:32.853Z | DEBUG | [drash] Using `HomeResource` resource class to handle the request.\n2019-12-27 17:33:32.855Z | DEBUG | [drash] Calling GET().\n2019-12-27 17:33:32.855Z | FATAL | This is a FATAL log message.\n2019-12-27 17:33:32.855Z | ERROR | This is an ERROR log message\n2019-12-27 17:33:32.856Z | WARN | This is a WARN log message\n2019-12-27 17:33:32.856Z | INFO | This is an INFO log message\n2019-12-27 17:33:32.856Z | DEBUG | This is a DEBUG log message\n2019-12-27 17:33:32.857Z | TRACE | This is a TRACE log message\n2019-12-27 17:33:32.857Z | DEBUG | [drash] Sending response. 200.\n",
        "extension": "log",
        "filename": "server.log",
        "title": "/path/to/your/project/server.log"
      }
    },
    "/src/example_code/tutorials/servers": {
      "serving_static_paths": {
        "contents": "",
        "filename": "serving_static_paths",
        "title": "/path/to/your/project/serving_static_paths"
      },
      "creating_a_server": {
        "contents": "",
        "filename": "creating_a_server",
        "title": "/path/to/your/project/creating_a_server"
      }
    },
    "/src/example_code/tutorials/servers/serving_static_paths": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  directory: \"/path/to/your/project\",\n  resources: [HomeResource],\n  response_output: \"text/html\",\n  static_paths: [\"/public\"]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\t▾ public/\n\t\tstyle.css\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = `\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>Drash</title>\n        <link href=\"/public/style.css\" rel=\"stylesheet\">\n      </head>\n      <body>\n        <h1 class=\"my-text\">This is my title and it is red.</h1>\n      </body>\n    </html>`;\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "public": {
        "contents": "",
        "filename": "public",
        "title": "/path/to/your/project/public"
      }
    },
    "/src/example_code/tutorials/servers/serving_static_paths/public": {
      "style": {
        "contents": ".my-text {\n    color: #ff0000;\n}\n",
        "extension": "css",
        "filename": "style.css",
        "language": "css",
        "title": "/path/to/your/project/style.css"
      }
    },
    "/src/example_code/tutorials/servers/creating_a_server": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\", // Accepts text/html, text/xml, application/xml\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n\n  public POST() {\n    this.response.body = \"POST request received!\";\n    return this.response;\n  }\n\n  public PUT() {\n    this.response.body = \"PUT request received!\";\n    return this.response;\n  }\n\n  public DELETE() {\n    this.response.body = \"DELETE request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/resource_lifecycle_hooks": {
      "hook_after_request": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public hook_afterRequest() {\n    console.log(\"Hooked after the request!\");\n  }\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "hook_after_request.ts",
        "language": "typescript",
        "title": "/path/to/your/project/hook_after_request.ts"
      },
      "hook_before_request": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public hook_beforeRequest() {\n    console.log(\"Hooked before the request!\");\n  }\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "hook_before_request.ts",
        "language": "typescript",
        "title": "/path/to/your/project/hook_before_request.ts"
      }
    },
    "/src/example_code/third_party_tutorials": {
      "databases": {
        "contents": "",
        "filename": "databases",
        "title": "/path/to/your/project/databases"
      },
      "template_engines": {
        "contents": "",
        "filename": "template_engines",
        "title": "/path/to/your/project/template_engines"
      }
    },
    "/src/example_code/third_party_tutorials/databases": {
      "deno_postgres_test": {
        "contents": "",
        "filename": "deno_postgres_test",
        "title": "/path/to/your/project/deno_postgres_test"
      },
      "deno_postgres": {
        "contents": "",
        "filename": "deno_postgres",
        "title": "/path/to/your/project/deno_postgres"
      },
      "deno_mysql": {
        "contents": "",
        "filename": "deno_mysql",
        "title": "/path/to/your/project/deno_mysql"
      },
      "deno_mysql_test": {
        "contents": "",
        "filename": "deno_mysql_test",
        "title": "/path/to/your/project/deno_mysql_test"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_postgres_test": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport members from \"../../../../../tests/members.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/postgres/mod.ts\";\n\nconst denoPostgres = new Client({\n  database: \"deno_postgres\",\n  host: \"localhost\",\n  port: \"5432\",\n  user: \"crookse\", // specify your db user\n});\n\nexport {\n  denoPostgres\n}\n\nmembers.test(\"deno-postgres\", async () => {\n  server.run();\n  const response = await members.fetch.get(\"http://localhost:1447\");\n  members.assert.responseJsonEquals(await response.text(), [[\"eric\",\"m\"]]);\n  server.deno_server.close();\n});\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { denoPostgres } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    await denoPostgres.connect();\n    let result = await denoPostgres.query(\"SELECT * FROM users;\");\n    this.response.body = result.rows;\n    await denoPostgres.end();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_postgres": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\nserver.run();\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/postgres/mod.ts\";\n\nconst denoPostgres = new Client({\n  database: \"deno_postgres\",\n  host: \"localhost\",\n  port: \"5432\",\n  user: \"user\", // specify your db user\n});\n\nexport {\n  denoPostgres\n}\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { denoPostgres } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    await denoPostgres.connect();\n    let result = await denoPostgres.query(\"SELECT * FROM users;\");\n    this.response.body = result.rows;\n    await denoPostgres.end();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_mysql": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\nserver.run();\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/mysql/mod.ts\";\n\nconst denoMysql = await new Client().connect({\n  hostname: \"127.0.0.1\",\n  username: \"username\", // specify your username\n  db: \"deno_mysql\",\n  // password: \"password\", // uncomment and specify your password if using a password\n});\n\nexport {\n  denoMysql\n}\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { denoMysql } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    this.response.body = await denoMysql.query(`select * from users`);\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_mysql_test": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport members from \"../../../../../tests/members.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/mysql/mod.ts\";\n\nconst denoMysql = await new Client().connect({\n  hostname: \"127.0.0.1\",\n  username: \"root\", // specify your username\n  db: \"deno_mysql\",\n  // password: \"password\", // uncomment and specify your password if using a password\n});\n\nexport {\n  denoMysql\n}\n\nmembers.test(\"deno_mysql\", async () => {\n  server.run();\n  const response = await members.fetch.get(\"http://localhost:1447\");\n  members.assert.responseJsonEquals(await response.text(), [\n    {\n      \"name\": \"manyuanrong\",\n      \"role\": \"author\"\n    }\n  ]);\n  server.deno_server.close();\n});\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { denoMysql } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    this.response.body = await denoMysql.query(`select * from users`);\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/template_engines": {
      "dejs_test": {
        "contents": "",
        "filename": "dejs_test",
        "title": "/path/to/your/project/dejs_test"
      },
      "dejs": {
        "contents": "",
        "filename": "dejs",
        "title": "/path/to/your/project/dejs"
      }
    },
    "/src/example_code/third_party_tutorials/template_engines/dejs_test": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>Drash + dejs</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash + dejs</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">Hello, <%= name %>! Drash + dejs is cool!</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#dejs</span>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport members from \"../../../../../tests/members.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nlet expected = `<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>Drash + dejs</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash + dejs</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">Hello, (name not specified)! Drash + dejs is cool!</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#dejs</span>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n`;\n\nmembers.test(\"dejs\", async () => {\n  server.run();\n  const response = await members.fetch.get(\"http://localhost:1447\");\n  members.assert.equals(await response.text(), expected);\n  server.deno_server.close();\n});\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs@0.3.4/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    // Set the data if any\n    let data = {\n      name: this.request.getQueryParam(\"name\")\n        ? this.request.getQueryParam(\"name\")\n        : \"(name not specified)\"\n    };\n    // Render and serve the template to the client\n    const output = await renderFile(\"./src/example_code/third_party_tutorials/template_engines/dejs_test/index.ejs\", data);\n    this.response.body = output.toString();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/template_engines/dejs": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>Drash + dejs</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash + dejs</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">Hello, <%= name %>! Drash + dejs is cool!</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#dejs</span>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs@0.3.4/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    // Set the data if any\n    let data = {\n      name: this.request.getQueryParam(\"name\")\n        ? this.request.getQueryParam(\"name\")\n        : \"(name not specified)\"\n    };\n    // Render and serve the template to the client\n    const output = await renderFile(\"./index.ejs\", data);\n    this.response.body = output.toString();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/getting_started": {
      "quickstart": {
        "contents": "",
        "filename": "quickstart",
        "title": "/path/to/your/project/quickstart"
      }
    },
    "/src/example_code/getting_started/quickstart": {
      "app": {
        "contents": "import Drash from \"https://deno.land/x/drash/mod.ts\";\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "execute": {
        "contents": "deno --allow-net app.ts\n\nDeno server started at localhost:1447.\n",
        "extension": "sh",
        "filename": "execute.sh",
        "language": "shell",
        "title": "Terminal"
      }
    }
  },
  "store": {
    "page_data": {
      "api_reference": {
        "Exceptions": {
          "HttpException": [
            {
              "doc_block": "/**\n* @memberof Drash.Exceptions\n* @class HttpException\n*\n* @description\n*     This class gives you a way to throw HTTP errors semantically.\n*/\n",
              "signature": "export default class HttpException extends Error { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the HTTP response code associated with this\n*     exception.\n*\n* @property number code\n*/\n",
              "signature": "public code: number;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param number code\n*     The HTTP response code associated with this exception.\n* @param string message\n*     (optional) The exception message.\n*/\n",
              "signature": "constructor(code: number, message?: string) { }",
              "member_type": "method"
            }
          ],
          "HttpMiddlewareException": [
            {
              "doc_block": "/**\n* @memberof Drash.Exceptions\n* @class HttpMiddlewareException\n*\n* @description\n*     This class gives you a way to throw HTTP errors semantically in the\n*     middleware classes. The difference between this class and HttpException\n*     comes when you want to check which exception was thrown via\n*     exception.constructor.name.\n*/\n",
              "signature": "export default class HttpMiddlewareException extends Error { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the HTTP response code associated with this\n*     exception.\n*\n* @property number code\n*/\n",
              "signature": "public code: number;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param number code\n*     The HTTP response code associated with this exception.\n* @param string message\n*     (optional) The exception message.\n*/\n",
              "signature": "constructor(code: number, message?: string) { }",
              "member_type": "method"
            }
          ]
        },
        "Http": {
          "Middleware": [
            {
              "doc_block": "/**\n* @memberof Drash.Http\n* @class Middleware\n*\n* @description\n*     This is the base middleware class for all middleware classes.\n*/\n",
              "signature": "export default abstract class Middleware { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the location that this middleware should process.\n*\n* @property string location\n*/\n",
              "signature": "public location: string;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the name of this middleware class. This property is\n*     used by Drash.Http.Server to help it store middleware in the correct\n*     middleware_* property.\n*\n* @property string name\n*/\n",
              "signature": "public name: string;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the request object.\n*\n* @property any request\n*/\n",
              "signature": "protected request: any;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the resource object. This property will only contain\n*     the resource object if this middleware is a resource-level middleware.\n*\n* @property Drash.Http.Resource resource\n*/\n",
              "signature": "protected resource: Drash.Http.Resource;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the response object. This property will only contain\n*     the response object if the server was able to get a response from the\n*     resource.\n*\n* @property Drash.Http.Resource resource\n*/\n",
              "signature": "protected response: Drash.Http.Response;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the server object handling this middleware.\n*\n* @property Drash.Http.Server server\n*/\n",
              "signature": "protected server: Drash.Http.Server;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @param any request\n*     The request object.\n* @param Drash.Http.Server server\n*     The server object handling this middleware.\n* @param Drash.Http.Resource resource\n*     (optional) If this is a resource-level middleware, then it will have\n*     access to the resource that uses it.\n*/\n",
              "signature": "constructor(request: any,server: Drash.Http.Server,resource?: Drash.Http.Resource,response?: Drash.Http.Response) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Run this middleware.\n*/\n",
              "signature": "abstract run();",
              "member_type": "method"
            }
          ],
          "Resource": [
            {
              "doc_block": "/**\n* @memberof Drash.Http\n* @class Resource\n*\n* @description\n*     This is the base resource class for all resources. All resource classes\n*     must be derived from this class.\n*/\n",
              "signature": "export default class Resource { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the middleware this resource uses.\n*\n*     All derived middleware classes MUST define this property as static\n*     (e.g., static middleware = [\"MiddlewareClass\"];)\n*\n* @property string[] middleware\n*/\n",
              "signature": "public middleware: string[];",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the name of this resource. This property is used by\n*     Drash.Http.Server to help it store resources in its resources property\n*     by name.\n*\n* @property string name\n*/\n",
              "signature": "public name: string;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the paths to access this resource.\n*\n*     All derived resource classes MUST define this property as static\n*     (e.g., static paths = [\"path\"];)\n*\n* @property string[] paths\n*/\n",
              "signature": "public paths: string[];",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     The request object.\n*\n* @property ServerRequest request\n*/\n",
              "signature": "protected request: any;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     The response object.\n*\n* @property Drash.Http.Response response\n*/\n",
              "signature": "protected response: Drash.Http.Response;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     The server object.\n*\n* @property Drash.Http.Server server\n*/\n",
              "signature": "protected server: Drash.Http.Server;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param ServerRequest request\n*     The request object.\n* @param Drash.Http.Response response\n*     The response object.\n* @param Drash.Http.Server server\n*     The server object.\n*/\n",
              "signature": "constructor(request,response: Drash.Http.Response,server: Drash.Http.Server) { }",
              "member_type": "method"
            }
          ],
          "Response": [
            {
              "doc_block": "/**\n* @memberof Drash.Http\n* @class Response\n*\n* @description\n*     Response handles sending a response to the client making the request.\n*/\n",
              "signature": "export default class Response { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the body of this response.\n*\n* @property any body\n*/\n",
              "signature": "public body: any = {};",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold this response's headers.\n*\n* @property Headers headers\n*/\n",
              "signature": "public headers: Headers;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     The request object.\n*\n* @property ServerRequest request\n*/\n",
              "signature": "public request: any;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold this response's status code (e.g., 200 for OK).\n*     This class uses Status and STATUS_TEXT from the Deno Standard\n*     Modules' http_status module for response codes.\n*\n* @property number status_code\n*/\n",
              "signature": "public status_code: number = Status.OK;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param ServerRequest request\n*/\n",
              "signature": "constructor(request) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Generate a response.\n*\n* @return any\n*/\n",
              "signature": "public generateResponse(): any { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the status message based on the status code.\n*\n* @return string\n*     Returns the status message associated with this.status_code. For\n*     example, if the response's status_code is 200, then this method\n*     will return \"OK\" as the status message.\n*/\n",
              "signature": "public getStatusMessage(): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the full status message based on the status code. This is just the\n*     status code and the status message together. For example:\n*\n*         If the status code is 200, then this will return \"200 (OK)\"\n*         If the status code is 404, then this will return \"404 (Not Found)\"\n*\n* @return string\n*/\n",
              "signature": "public getStatusMessageFull(): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Send the response to the client making the request.\n*\n* @return Promise<any>\n*     Returns the output which is passed to `request.respond()`. The output\n*     is only returned for unit testing purposes. It is not intended to be\n*     used elsewhere as this call is the last call in the\n*     request-resource-response lifecycle.\n*/\n",
              "signature": "public async send(): Promise<any> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Send the response of a static asset (e.g., a CSS file, JS file, PDF\n*     file, etc.) to the client making the request.\n*\n* @param string file\n*     The file that will be served to the client.\n*\n* @return {status: number, headers: Headers, body: any}\n*/\n",
              "signature": "public sendStatic(file: string): { }status: number, headers: Headers, body: any} {",
              "member_type": "method"
            }
          ],
          "Server": [
            {
              "doc_block": "/**\n* @memberof Drash.Http\n* @class Server\n*\n* @description\n*     Server handles the entire request-resource-response lifecycle. It is in\n*     charge of handling HTTP requests to resources, static paths, sending\n*     appropriate responses, and handling any errors that bubble up within the\n*     request-resource-response lifecycle.\n*/\n",
              "signature": "export default class Server { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the Deno server. This property is set in\n*     this.run() like so:\n*\n*         this.deno_server = serve(this.configs.address);\n*\n*     serve() is imported from https://deno.land/x/http/server.ts.\n*\n* @property any deno_server\n*/\n",
              "signature": "public deno_server: any;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold this server's logger.\n*\n* @property Drash.Loggers.ConsoleLogger|Drash.Loggers.FileLogger logger\n*/\n",
              "signature": "public logger: Drash.CoreLoggers.ConsoleLogger | Drash.CoreLoggers.FileLogger;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold this server's configs.\n*\n* @property any configs\n*/\n",
              "signature": "protected configs: ServerConfigs;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the location of this server on the filesystem. This\n*     property is used when resolving static paths.\n*\n* @property string directory\n*/\n",
              "signature": "protected directory: string;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold middleware.\n*\n* @property any middleware\n*/\n",
              "signature": "protected middleware: any = { }",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     A property to hold the resources passed in from the configs.\n*\n* @property any[] resources\n*/\n",
              "signature": "protected resources: any[] = [];",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     This server's list of static paths. HTTP requests to a static path are\n*     usually intended to retrieve some type of concrete resource (e.g., a\n*     CSS file or a JS file). If an HTTP request is matched to a static path\n*     and the resource the HTTP request is trying to get is found, then\n*     Drash.Http.Response will use its sendStatic() method to send the\n*     static asset back to the client.\n*\n* @property string[] static_paths\n*/\n",
              "signature": "protected static_paths: string[] = [];",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param ServerConfigs configs\n*     See Drash.Interfaces.ServerConfigs\n*/\n",
              "signature": "constructor(configs: ServerConfigs) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the request object with more properties and methods.\n*\n* @param any request\n*     The request object.\n*\n* @return any\n*     Returns any \"request\" object with more properties and methods that\n*     Drash uses. For example, deno uses the `ServerRequest` object; and this\n*     method takes that object and hydrates it with more properties and\n*     methods.\n*/\n",
              "signature": "public async getRequest(request: any): Promise<any> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Handle an HTTP request from the Deno server.\n*\n* @param any request\n*     The request object.\n*\n* @return Promise<any>\n*    See `Drash.Http.Response.send()`.\n*/\n",
              "signature": "public async handleHttpRequest(request): Promise<any> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Handle cases when an error is thrown when handling an HTTP request.\n*\n* @param any request\n*     The request object.\n* @param any error\n*     The error object.\n*\n* @return any\n*     See `Drash.Http.Response.send()`.\n*/\n",
              "signature": "public handleHttpRequestError(request: any,error: any,resource: Drash.Http.Resource = null,response: Drash.Http.Response = null): any { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Handle HTTP requests for the favicon. This method only exists to\n*     short-circuit favicon requests--preventing the requests from clogging\n*     the logs.\n*\n* @param any request\n*\n* @return string\n*     Returns the response as stringified JSON. This is only used for unit\n*     testing purposes.\n*/\n",
              "signature": "public handleHttpRequestForFavicon(request): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Handle HTTP requests for static path assets.\n*\n* @param any request\n*\n* @return any\n*     Returns the response as stringified JSON. This is only used for unit\n*     testing purposes.\n*/\n",
              "signature": "public handleHttpRequestForStaticPathAsset(request): any { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* \n* @param resourceClass \n* @param request \n* \n* @return resourceClass\n*     Returns an instance of the resourceClass passed in, and setting the\n*     `paths` and `middleware` properties\n*/\n",
              "signature": "public getResourceObject(resourceClass: any, request: any): Resource { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Run the Deno server at the address specified in the configs. This\n*     method takes each HTTP request and creates a new and more workable\n*     request object and passes it to\n*     `Drash.Http.Server.handleHttpRequest()`.\n*\n* @return Promise<void>\n*     This method just listens for requests at the address you provide in the\n*     configs.\n*/\n",
              "signature": "public async run(options?: RunOptions): Promise<void> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Close the server.\n*/\n",
              "signature": "public close(): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Add an HTTP resource to the server which can be retrieved at specific\n*     URIs.\n*\n*     Drash defines an HTTP resource according to the MDN Web docs\n*     [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web).\n*\n* @param Drash.Http.Resource resourceClass\n*     A child object of the `Drash.Http.Resource` class.\n*\n* @return void\n*     This method just adds `resourceClass` to `this.resources` so it can be\n*     used (if matched) during an HTTP request.\n*/\n",
              "signature": "protected addHttpResource(resourceClass: Drash.Http.Resource): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Add server-level and resource-level middleware.\n*\n* @param any middleware\n*\n* @return void\n*/\n",
              "signature": "protected addMiddleware(middleware: any): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Add a static path for serving static assets like CSS files, JS files,\n*     PDF files, etc.\n*\n* @param string path\n*\n* @return void\n*     This method just adds `path` to `this.static_paths` so it can be used (if\n*     matched) during an HTTP request.\n*/\n",
              "signature": "protected addStaticPath(path: string): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Execute resource-level middleware after the request.\n*\n* @param any request\n*     The request object.\n* @param Drash.Http.Resource resource\n*     The resource object.\n*\n* @return void\n*/\n",
              "signature": "protected executeMiddlewareResourceLevelAfterRequest(request,resource,response): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Execute resource-level middleware before the request.\n*\n* @param any request\n*     The request object.\n* @param Drash.Http.Resource resource\n*     The resource object.\n*\n* @return void\n*/\n",
              "signature": "protected executeMiddlewareResourceLevelBeforeRequest(request, resource): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Execute server-level middleware before the request.\n*\n* @param any request\n*     The request object.\n* @param Drash.Http.Resource resource\n*     The resource object.\n*\n* @return void\n*/\n",
              "signature": "protected executeMiddlewareServerLevelBeforeRequest(request): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Execute server-level middleware after the request.\n*\n* @param any request\n*     The request object.\n* @param Drash.Http.Resource resource\n*     The resource object.\n*\n* @return void\n*/\n",
              "signature": "protected executeMiddlewareServerLevelAfterRequest(request,resource,response): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* Get an HTTP error response exception object.\n*\n* @param number code\n*\n* @return Drash.Exceptions.HttpException\n*/\n",
              "signature": "protected httpErrorResponse(code: number): Drash.Exceptions.HttpException { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the resource class.\n*\n* @param any request\n*     The request object.\n*\n* @return Drash.Http.Resource|undefined\n*     Returns a `Drash.Http.Resource` object if the URL path of the request\n*     can be matched to a `Drash.Http.Resource` object's paths.\n*\n*     Returns `undefined` if a `Drash.Http.Resource` object can't be matched.\n*/\n",
              "signature": "protected getResourceClass(request): Drash.Http.Resource | undefined { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Is the request targeting a static path?\n*\n* @param any request\n*\n* @return boolean\n*     Returns true if the request targets a static path.\n*/\n",
              "signature": "protected requestTargetsStaticPath(request): boolean { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Log a debug message\n* \n* @param string message\n*     Message to log\n* \n* @return void\n*/\n",
              "signature": "protected logDebug(message: string): void { }",
              "member_type": "method"
            }
          ]
        },
        "Interfaces": {
          "LogLevelStructure": [
            {
              "doc_block": "/**\n* @memberof Drash.Interfaces\n* @interface LogLevelStructure\n*\n* @description\n*     name: string\n*\n*         The name of the log level (e.g., \"debug\").\n*\n*     rank: number\n*\n*         The rank of the log level. See the\n*         Drash.Dictionaries.LogLevels.LogLevel enum member to see the ranking\n*         structure of the log levels.\n*/\n",
              "signature": "export interface LogLevelStructure { }",
              "member_type": "method"
            }
          ],
          "LoggerConfigs": [
            {
              "doc_block": "/**\n* @memberof Drash.Interfaces\n* @interface LoggerConfigs\n*\n* @description\n*     enabled: boolean\n*\n*         Is the logger enabled? This is useful if you have a config file that\n*         can toggle this option between `true` and `false`.\n*\n*     file?: string\n*\n*         The filename to log to (used in Drash.CoreLoggers.FileLogger).\n*\n*     level?: string\n*\n*         Options are:\n*\n*             all\n*             trace\n*             debug\n*             info\n*             warn\n*             error\n*             fatal\n*             off\n*\n*         Defaults to \"debug\".\n*\n*     tag_string?: string\n*\n*         A string with tags. Tags must be wrapped in brackets in order for the\n*         logger classes to properly identify them. For example,\n*\n*             {some_tag} | {some_tag} * {some_tag} [{some_tag}]`.\n*\n*     tag_string_fns?: any\n*\n*         This takes an object of key-value pairs where the key is the name of\n*         the tag defined in the `tag_string` config. This object is used to\n*         replace tags in the `tag_string` config by matching keys to tags and\n*         replacing tags with the values of the keys. For example, if\n*         `tag_string` was `{my_cool_tag}` and `tags_string_fns.my_cool_tag`\n*         returns `\"HELLO\"`, then `{my_cool_tag}` would be replaced with\n*         `HELLO`.\n*\n*     test?: boolean\n*\n*         Is the logger running in a test process? Setting this to true will\n*         silence the console logger from outputting to the console so you can\n*         test without actually logging to the console.\n*/\n",
              "signature": "export interface LoggerConfigs { }",
              "member_type": "method"
            }
          ],
          "ParsedRequestBody": [
            {
              "doc_block": "/**\n* @memberof Drash.Interfaces\n* @interface ParsedRequestBody\n*\n* @description\n*     content_type: any|undefined\n*\n*         The Content-Type of the request body. For example, if the body is\n*         JSON, then the Content-Type should be application/json.\n*\n*     data: any|undefined\n*\n*         The data passed in the body of the request.\n*/\n",
              "signature": "export interface ParsedRequestBody { }",
              "member_type": "method"
            }
          ],
          "ServerConfigs": [
            {
              "doc_block": "/**\n* @memberof Drash.Interfaces\n* @interface ServerConfigs\n*\n* @description\n*     address?: string\n*\n*         The hostname and port that the server will run on. For example,\n*\n*             address: \"localhost:1337\"\n*\n*     directory?: string\n*\n*         The path to the directory of the server on the filesystem.  This is\n*         used when resolving static paths, so make sure you have this set\n*         correctly if you are serving static paths.\n*\n*     logger?: Drash.CoreLoggers.ConsoleLogger | Drash.CoreLoggers.FileLogger\n*\n*         The server's logger.\n*\n*     memory_allocation?: {\n*       multipart_form_data?: number\n*     }\n*         How much memory should be allocated to certain parts of the codebase.\n*         For example, the multipart reader uses a default of 10MB, but you can\n*         override that default by specifying the following:\n*\n*             memory_allocation: {\n*               multipart_form_data: 128 // Would be translated to 128MB\n*             }\n*\n*     middleware?: any\n*\n*         The middleware that the server should use. Server-level middleware\n*         should be placed in middleware.server_level. Resource-level\n*         middleware should be placed in middleware.resource_level. For\n*         example,\n*\n*             middleware: {\n*               resource_level: { ... },\n*               server_level: { ... }\n*             }\n*\n*     resources: any\n*\n*         An array of resources that the server should register. Passing in 0\n*         resources means clients can't access anything on the server--because\n*         there aren't any resources.\n*\n*     response_output?: string\n*\n*         The fallback response Content-Type that the server should use. For\n*         example, the following would have the server default to JSON\n*         responses. The response_output MUST be a proper MIME type.\n*\n*             response_output: \"application/json\"\n*\n*     static_paths?: string[]\n*\n*         An array of static paths. Static paths are made public to clients.\n*         This means they can access anything in static paths. For example, if\n*         you have /public as a static path, then clients can look at things\n*         under your /path/to/your/server/public directory.\n*/\n",
              "signature": "export interface ServerConfigs { }",
              "member_type": "method"
            }
          ]
        },
        "Loggers": {
          "ConsoleLogger": [
            {
              "doc_block": "/**\n* @memberof Drash.CoreLoggers\n* @class ConsoleLogger\n*\n* @description\n*     This logger allows you to log messages to the console.\n*/\n",
              "signature": "export default class ConsoleLogger extends Logger { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param any configs\n*     See Drash.Interfaces.LoggerConfigs.\n*/\n",
              "signature": "constructor(configs: LoggerConfigs) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Write a log message to the console.\n*\n*     This method is not intended to be called directly. It is already used\n*     in the base class (Logger) and automatically called.\n*\n* @param any logMethodLevelDefinition\n* @param string message\n*\n* @return string\n*     Returns the log message which is used for unit testing purposes.\n*/\n",
              "signature": "public write(logMethodLevelDefinition: any, message: string): string|void { }",
              "member_type": "method"
            }
          ],
          "FileLogger": [
            {
              "doc_block": "/**\n* @memberof Drash.CoreLoggers\n* @class FileLogger\n*\n* @description\n*     This logger allows you to log messages to a file.\n*/\n",
              "signature": "export default class FileLogger extends Logger { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     The file this logger will write log messages to.\n*\n* @property string file\n*/\n",
              "signature": "protected file: string;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param LoggerConfigs configs\n*     See Drash.Interfaces.LoggerConfigs.\n*\n*/\n",
              "signature": "constructor(configs: LoggerConfigs) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Write a log message to this.file.\n*\n*     This method is not intended to be called directly. It is already used\n*     in the base class (Logger) and automatically called.\n*\n* @param any logMethodLevelDefinition\n* @param string message\n*\n* @return string\n*     Returns the log message which is used for unit testing purposes.\n*/\n",
              "signature": "public write(logMethodLevelDefinition, message): string { }",
              "member_type": "method"
            }
          ],
          "Logger": [
            {
              "doc_block": "/**\n* @memberof Drash.CoreLoggers\n* @class Logger\n*\n* @description\n*     This Logger is the base logger class for all logger classes.\n*/\n",
              "signature": "export default abstract class Logger { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     See Drash.Interfaces.LoggerConfigs\n*\n* @property any configs\n*/\n",
              "signature": "protected configs: LoggerConfigs;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @description\n*     The level of the log message currently being written.\n*\n* @property string current_log_message_level_name\n*/\n",
              "signature": "protected current_log_message_level_name: string;",
              "member_type": "property"
            },
            {
              "doc_block": "/**\n* @doc-blocks-to-json ignore-doc-block\n*/\n",
              "signature": "protected test: boolean = false;",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Construct an object of this class.\n*\n* @param LoggerConfigs configs\n*     See Drash.Interfaces.LoggerConfigs.\n*/\n",
              "signature": "constructor(configs: LoggerConfigs) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Write a log message. All extended classes must implement this method.\n*     See Drash.CoreLoggers.ConsoleLogger/FileLogger for examples.\n*\n* @param any logMethodLevelDefinition\n* @param string message\n*/\n",
              "signature": "abstract write(logMethodLevelDefinition, message);",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Output a DEBUG level log message.\n*\n* @param string message\n*     The log message.\n*/\n",
              "signature": "public debug(message) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Output an ERROR level log message.\n*\n* @param string message\n*     The log message.\n*/\n",
              "signature": "public error(message) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Output a FATAL level log message.\n*\n* @param string message\n*     The log message.\n*/\n",
              "signature": "public fatal(message) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Output an INFO level log message.\n*\n* @param string message\n*     The log message.\n*/\n",
              "signature": "public info(message) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Output a TRACE level log message.\n*\n* @param string message\n*     The log message.\n*/\n",
              "signature": "public trace(message) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Output a WARN level log message.\n*\n* @param string message\n*     The log message.\n*/\n",
              "signature": "public warn(message) { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the parsed version of the raw tag string.\n*\n* @return string\n*/\n",
              "signature": "protected getTagStringParsed(): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Send the message to the write method (which should be in the child\n*     class).  Also, do some prechecks before sending to see if the log\n*     message should be written.\n*\n* @param any logMethodLevelDefinition\n*     The dictionary definition of the log message's level.\n* @param string message\n*     The log message.\n*\n* @return string\n*     Returns the log message which is used for unit testing purposes.\n*/\n",
              "signature": "protected sendToWriteMethod(logMethodLevelDefinition, message): string { }",
              "member_type": "method"
            }
          ],
          "Server": ""
        },
        "Services": {
          "HttpService": [
            {
              "doc_block": "/**\n* @memberof Drash.Services\n* @class HttpService\n*\n* @description\n*     This class helps perform HTTP-related processes.\n*/\n",
              "signature": "export default class HttpService { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     Get a MIME type for a file based on its extension.\n*\n* @param string filePath\n*     The file path in question.\n* @param boolean fileIsUrl\n*     (optional) Is the file path  a URL to a file? Defaults to false.\n*\n*     If the file path is a URL, then this method will make sure the URL\n*     query string is not included while doing a lookup of the file's\n*     extension.\n*\n* @return string\n*     Returns the name of the MIME type based on the extension of the\n*     file path .\n*/\n",
              "signature": "public getMimeType(filePath: string, fileIsUrl: boolean = false): string { }",
              "member_type": "method"
            }
          ],
          "HttpRequestService": [
            {
              "doc_block": "/**\n* @memberof Drash.Services\n* @class HttpRequestService\n*\n* @description\n*     This class helps perform HTTP request related processes.\n*/\n",
              "signature": "export default class HttpRequestService { }",
              "member_type": "class"
            },
            {
              "doc_block": "/**\n* @description\n*     Parse this request's body as `multipart/form-data` and get the\n*     requested input.\n*\n* @param string file\n*     The file to get by its name.\n* @param number maxMemory\n*     The max memory to allocate for this process. Defaults to 1MB.\n*\n* @return any\n*     Returns a body as a parsable JSON object where the first level of keys\n*     are the names of the parts. For example, if the name of the first part\n*     is `file_number_one`, then it will be accessible in the returned object\n*     as `{returned_object}.file_number_one`.\n*/\n",
              "signature": "public getRequestBodyFile(parsedBody: ParsedRequestBody, input: string): any { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the value of one of this request's body params by its input name.\n*     First, check the Content-Type of the request so that we know how to\n*     parse the body. Then parse the body accordingly and retrieve the\n*     requested value.\n*\n* @return any\n*/\n",
              "signature": "public getRequestBodyParam(parsedBody: ParsedRequestBody, input: string): any { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the value of one of this request's headers by its input name.\n*\n* @return string\n*/\n",
              "signature": "public getRequestHeaderParam(request: any, input: string): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the value of one of this request's path params by its input name.\n*\n* @return string\n*/\n",
              "signature": "public getRequestPathParam(request: any, input: string): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the value of one of this request's query params by its input name.\n*\n* @return string\n*/\n",
              "signature": "public getRequestUrlQueryParam(request: any, input: string): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the request's requested content type.\n*\n*     There are three ways to get this value: (1) the request's headers by\n*     setting `Response-Content-Type: \"type\"`, (2) the request's URL query\n*     params by setting `?response_content_type=type`, and the request's body\n*     by setting `{response_content_type: \"type\"}`.\n*\n*     The request's body takes precedence over all other settings.\n*\n*     The request's URL query params takes precedence over the header setting\n*     and the default setting.\n*\n*     The request's header setting takes precedence over the default setting.\n*\n*     If no content type is specified by the request's body, URL query\n*     params, or header, then the default content type will be used. The\n*     default content type is the content type defined in the\n*     `Drash.Http.Server` object's `response_output` config. If a default is\n*     not specified, then \"application/json\" will be used.\n*/\n",
              "signature": "public getResponseContentType(request: any,defaultContentType: string = \"application/json\"): void { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get this request's URL path.\n*\n* @return string\n*     Returns the URL path.\n*/\n",
              "signature": "public getUrlPath(request): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the request's URL query params by parsing its URL query string.\n*\n* @param any request\n*     The request object.\n*\n* @return any\n*     Returns the URL query string in key-value pair format.\n*/\n",
              "signature": "public getUrlQueryParams(request: any): any { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Get the specified HTTP request's URL query string.\n*\n* @return string\n*     Returns the URL query string (e.g., key1=value1&key2=value2) without\n*     the leading \"?\" character.\n*/\n",
              "signature": "public getUrlQueryString(request: any): string { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Does the specified request have a body?\n*\n* @return Promise<boolean>\n*     Returns `true` if the request has a body. Returns `false` if not.\n*/\n",
              "signature": "public async hasBody(request: any): Promise<boolean> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Hydrate the specified request object.\n*\n* @return Promise<boolean>\n*     Returns a hydrated request object. For example, deno uses the\n*     `ServerRequest` object. This method takes that object and adds more\n*     porperties and methods to it. This makes it easier for Drash to process\n*     the object for its own purposes.\n*/\n",
              "signature": "public async hydrate(request: any, options?: OptionsConfig): Promise<boolean> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Parse the specified request's body.\n* \n* @param any request\n* @param OptionsConfig options\n* \n* @returns {content_type: string, data: any}\n*     Returns the content type of the body, and based on this\n*     the body itself in that format. If there is no body, it\n*     returns an empty properties\n*/\n",
              "signature": "public async parseBody(request: any, options: OptionsConfig): Promise<ParsedRequestBody> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*    Parse this request's body as application/x-www-form-url-encoded.\n*\n* @return Promise<object|Array<>>\n*    Returns an empty object if no body exists, else a key/value pair\n*    array e.g. returnValue['someKey']\n*/\n",
              "signature": "public async parseBodyAsFormUrlEncoded(request: any): Promise<object|Array<any>> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*    Parse this request's body as application/json.\n*\n* @return Promise<object>\n*    JSON object - the decoded request body\n*/\n",
              "signature": "public async parseBodyAsJson(request: any): Promise<object> { }",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*    Parse this request's body as multipart/form-data.\n*\n* @param Reader body\n*     The request's body.\n* @param string boundary\n*     The boundary of the part (e.g., `----------437192313`)\n* @param number maxMemory\n*     The maximum memory to allocate to this process in megabytes.\n*\n* @return Promise<{ [key: string]: string | FormFile }>\n*     Returned values can be seen here (look for `readForm`:\n*     https://deno.land/std@v0.32.0/mime/multipart.ts\n*/\n",
              "signature": "public async parseBodyAsMultipartFormData(body: Reader,boundary: string,maxMemory: number): Promise<{ } [key: string]: string | FormFile }> {",
              "member_type": "method"
            },
            {
              "doc_block": "/**\n* @description\n*     Set headers on the request.\n*\n* @param any request\n* @param any headers\n* \n* @return void\n*/\n",
              "signature": "public setHeaders(request: any, headers: Headers): void { }",
              "member_type": "method"
            }
          ]
        }
      }
    }
  }
};