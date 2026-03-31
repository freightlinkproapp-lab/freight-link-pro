import SwiftUI

struct RootView: View {
    var body: some View {
        TabView {
            Text("Loads")
                .tabItem { Label("Loads", systemImage: "truck.box") }
            Text("Contracts")
                .tabItem { Label("Contracts", systemImage: "doc.text") }
            Text("Payment")
                .tabItem { Label("Payment", systemImage: "creditcard") }
            Text("Profile")
                .tabItem { Label("Profile", systemImage: "person.crop.circle") }
        }
    }
}
