### Step-1: Installation
   - Install DevRev CLI
   - Install jq

### Step-2: Log in to DevRev for authentication
To authenticate, run the following command:

```
devrev profiles authenticate -o testbeep -u poojithukaradi06@gmail.com
```

### Step-3: Creating a snap-in package
To create a snap-in package, run the following command:
```
devrev snap_in_package create-one --slug  new-hello-world | jq-windows-amd64 .
```
    
### Step-4: Creating a snap-in version
To create a snap-in version, run the following command:

```
devrev snap_in_version create-one --manifest Hello-world\manifest.yaml --archive Hello-world\code\build.tar.gz | jq-windows-amd64.
```

### Step-5: Installing a snap-in from a snap-in version

To create a snap-in from a snap-in version, run the following command:

```
devrev snap_in draft
```

### Step-6: Open your org website > goto settigns>Integrations>Snap-ins

Your snap-in will be available
        